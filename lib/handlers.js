// All API logic. The files in /api are thin wrappers around these handlers.

const crypto = require('crypto');
const store = require('./store');
const { baseUrl } = require('./site');

const MIN_WAIT_MS = 6000;             // wait required before a platform can be confirmed
const TOKEN_TTL_MS = 60 * 60 * 1000;  // proofs / verified tokens are valid for 1 hour
const ID_RE = /^[A-Za-z0-9_-]{4,12}$/;
const ID_LEN = 6;                     // short link length -> yoursite.com/aB3xK9
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const ALLOWED_PLATFORMS = new Set([
  'WhatsApp', 'YouTube', 'Telegram', 'TikTok', 'Facebook', 'Instagram', 'Pinterest',
  'LinkedIn', 'X / Twitter', 'Snapchat', 'Discord', 'Reddit', 'Spotify', 'Twitch', 'Threads'
]);

// Signing secret: set SECRET in env, otherwise derived from the Redis token (zero config).
const SECRET = process.env.SECRET ||
  (store.REST_TOKEN ? crypto.createHash('sha256').update('s4u:' + store.REST_TOKEN).digest('hex') : 'dev-secret-change-me');

// ---------- small helpers ----------
const err = (status, message, extra) => Object.assign(new Error(message), { status, extra });

function send(res, status, obj) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(obj));
}

async function readBody(req) {
  if (req.method === 'GET') return {};
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') {
      try { return req.body ? JSON.parse(req.body) : {}; } catch (e) { throw err(400, 'Invalid JSON'); }
    }
    if (Buffer.isBuffer(req.body)) {
      try { return JSON.parse(req.body.toString('utf8') || '{}'); } catch (e) { throw err(400, 'Invalid JSON'); }
    }
    return req.body;
  }
  if (req.readableEnded) return {};
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => {
      size += c.length;
      if (size > 20 * 1024) { reject(err(413, 'Request too large')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      try { resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}); }
      catch (e) { reject(err(400, 'Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

function clientIp(req) {
  const xf = req.headers['x-forwarded-for'];
  return ((xf ? String(xf).split(',')[0].trim() : null) || req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown');
}

function safeUrl(u) {
  if (typeof u !== 'string' || u.length > 2048) return null;
  try {
    const x = new URL(u.trim());
    return x.protocol === 'http:' || x.protocol === 'https:' ? x.href : null;
  } catch (e) { return null; }
}

function newId() {
  let s = '';
  for (let i = 0; i < ID_LEN; i++) s += ALPHABET[crypto.randomInt(ALPHABET.length)];
  return s;
}

async function limited(key, max, windowSec) {
  return (await store.incr(key, windowSec)) > max;
}

// ---------- passwords ----------
function hashPw(pw, saltHex) {
  const salt = saltHex ? Buffer.from(saltHex, 'hex') : crypto.randomBytes(16);
  return { salt: salt.toString('hex'), hash: crypto.scryptSync(pw, salt, 32).toString('hex') };
}
function checkPw(pw, rec) {
  const a = Buffer.from(hashPw(pw, rec.pwSalt).hash, 'hex');
  const b = Buffer.from(rec.pwHash, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// ---------- signed stateless tokens ----------
function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const mac = crypto.createHmac('sha256', SECRET).update(body).digest('base64url');
  return `${body}.${mac}`;
}
function verifyToken(token, type, id) {
  if (typeof token !== 'string' || token.length > 1000) return null;
  const [body, mac] = token.split('.');
  if (!body || !mac) return null;
  const expect = crypto.createHmac('sha256', SECRET).update(body).digest();
  let given;
  try { given = Buffer.from(mac, 'base64url'); } catch (e) { return null; }
  if (given.length !== expect.length || !crypto.timingSafeEqual(given, expect)) return null;
  let p;
  try { p = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')); } catch (e) { return null; }
  if (p.t !== type || p.id !== id || Date.now() - p.at > TOKEN_TTL_MS) return null;
  return p;
}

async function loadLink(id) {
  if (!ID_RE.test(id || '')) throw err(404, 'This locked link does not exist.');
  const raw = await store.get('l:' + id);
  if (!raw) throw err(404, 'This locked link does not exist.');
  return typeof raw === 'string' ? JSON.parse(raw) : raw;
}

// ---------- handlers ----------
async function create(req, res) {
  if (req.method !== 'POST') throw err(405, 'Method not allowed');
  if (await limited('rl:create:' + clientIp(req), 30, 3600)) throw err(429, 'Too many links created. Try again later.');
  const b = await readBody(req);

  const url = safeUrl(b.url);
  if (!url) throw err(400, 'Please provide a valid http(s) link to lock.');

  const platforms = Array.isArray(b.platforms) ? [...new Set(b.platforms)] : [];
  if (platforms.some(p => !ALLOWED_PLATFORMS.has(p))) throw err(400, 'Unknown platform selected.');

  const platformUrls = {};
  for (const p of platforms) {
    const u = safeUrl((b.platformUrls || {})[p]);
    if (!u) throw err(400, `Add a valid http(s) link for ${p}.`);
    platformUrls[p] = u;
  }

  const hasPw = b.pw != null && b.pw !== '';
  if (!platforms.length && !hasPw) throw err(400, 'Add at least one platform or set a password to create a locked link.');

  const rec = { url, platforms, platformUrls, created: Date.now() };
  if (hasPw) {
    if (typeof b.pw !== 'string' || b.pw.length > 200) throw err(400, 'Invalid password.');
    const h = hashPw(b.pw);
    rec.pwSalt = h.salt; rec.pwHash = h.hash;
  }

  let id = null;
  for (let i = 0; i < 8 && !id; i++) {
    const cand = newId();
    if (await store.setnx('l:' + cand, JSON.stringify(rec))) id = cand;
  }
  if (!id) throw err(500, 'Could not generate a link. Try again.');

  send(res, 201, { shortId: id, shareUrl: `${baseUrl(req)}/${id}` });
}

async function info(req, res) {
  if (req.method !== 'GET') throw err(405, 'Method not allowed');
  if (await limited('rl:info:' + clientIp(req), 300, 3600)) throw err(429, 'Too many requests.');
  const id = req.query.id;
  const rec = await loadLink(id);
  // The real destination URL is never returned here.
  send(res, 200, { platforms: rec.platforms, platformUrls: rec.platformUrls, hasPw: !!rec.pwHash });
}

async function action(req, res) {
  if (req.method !== 'POST') throw err(405, 'Method not allowed');
  const { id, action: act } = req.query;
  const rec = await loadLink(id);
  const b = await readBody(req);

  // 1) visitor opened a platform -> signed proof with the start time
  if (act === 'open') {
    if (!rec.platforms.includes(b.platform)) throw err(400, 'Unknown platform.');
    return send(res, 200, { waitMs: MIN_WAIT_MS, proof: sign({ t: 'o', id, p: b.platform, at: Date.now() }) });
  }

  // 2) visitor confirms -> accepted only if MIN_WAIT_MS has passed since the proof
  if (act === 'verify') {
    const p = verifyToken(b.proof, 'o', id);
    if (!p || p.p !== b.platform) throw err(410, 'Session expired. Please reload the page.');
    const left = MIN_WAIT_MS - (Date.now() - p.at);
    if (left > 0) throw err(400, 'Please wait a little longer.', { waitMs: left });
    return send(res, 200, { ok: true, token: sign({ t: 'v', id, p: p.p, at: Date.now() }) });
  }

  // 3) unlock -> all platforms verified + correct password
  if (act === 'unlock') {
    const tokens = Array.isArray(b.tokens) ? b.tokens.slice(0, 20) : [];
    const done = new Set();
    for (const t of tokens) { const p = verifyToken(t, 'v', id); if (p) done.add(p.p); }
    if (!rec.platforms.every(p => done.has(p))) throw err(403, 'Verification incomplete or expired. Reload the page and try again.');

    if (rec.pwHash) {
      if (await limited(`rl:pw:${id}:${clientIp(req)}`, 10, 600)) throw err(429, 'Too many wrong attempts. Try again in a few minutes.');
      if (typeof b.pw !== 'string' || !checkPw(b.pw, rec)) throw err(401, 'Incorrect password.');
    }
    store.incr('unlocks:' + id).catch(() => {}); // best-effort counter
    return send(res, 200, { url: rec.url });
  }

  throw err(404, 'Not found');
}

// Wraps a handler with error handling.
const wrap = fn => async (req, res) => {
  try { await fn(req, res); }
  catch (e) {
    if (!e.status) console.error(e);
    send(res, e.status || 500, { error: e.status ? e.message : 'Server error', ...(e.extra || {}) });
  }
};

module.exports = { create: wrap(create), info: wrap(info), action: wrap(action) };
