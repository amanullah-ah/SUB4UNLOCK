// Storage layer.
//  - Production (Vercel): Upstash Redis via REST (env vars set by the Vercel integration)
//  - Local dev: a JSON file in ./data (only when no Redis env vars are present)

const fs = require('fs');
const path = require('path');

const REST_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const remote = !!(REST_URL && REST_TOKEN);

// ---------- remote (Upstash REST) ----------
async function cmd(args) {
  const r = await fetch(REST_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REST_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args)
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) throw new Error(j.error || 'Storage error');
  return j.result;
}

// ---------- local file fallback ----------
const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
let local = null;
function loadLocal() {
  if (local) return local;
  try { local = JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); } catch (e) { local = {}; }
  return local;
}
function saveLocal() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify(local));
}

function assertConfigured() {
  if (!remote && process.env.VERCEL) {
    throw Object.assign(new Error('Database not connected. Add an Upstash Redis store to this Vercel project and redeploy.'), { status: 500 });
  }
}

// Returns true if the key was created, false if it already existed.
async function setnx(key, value) {
  assertConfigured();
  if (remote) return (await cmd(['SET', key, value, 'NX'])) === 'OK';
  const db = loadLocal();
  if (db[key] !== undefined) return false;
  db[key] = value; saveLocal();
  return true;
}

async function get(key) {
  assertConfigured();
  if (remote) return await cmd(['GET', key]);
  const v = loadLocal()[key];
  return v === undefined ? null : v;
}

// Counter with expiry (used for rate limiting). Returns the new count.
async function incr(key, ttlSec) {
  assertConfigured();
  if (remote) {
    // Create the key WITH its expiry first (only if it does not exist yet), then INCR.
    // If a call fails in between, the key still has a TTL, so it can never get stuck forever.
    if (ttlSec) await cmd(['SET', key, '0', 'EX', String(ttlSec), 'NX']);
    return await cmd(['INCR', key]);
  }
  const db = loadLocal();
  const now = Date.now();
  let rec = db[key];
  if (!rec || typeof rec !== 'object' || rec.exp < now) rec = { n: 0, exp: now + (ttlSec || 3600) * 1000 };
  rec.n++;
  db[key] = rec; saveLocal();
  return rec.n;
}

module.exports = { remote, REST_TOKEN, setnx, get, incr };
