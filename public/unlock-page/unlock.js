const PLATFORMS = [
  { key:'WhatsApp', color:'#25D366', svg:`<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5Zm0 17.2a7.7 7.7 0 0 1-3.9-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A7.7 7.7 0 1 1 12 19.7Zm4.2-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1s-.6.8-.8.9c-.1.1-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.6-1.2-1.4-1.4-1.7-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4 0-.1 0-.3-.1-.4-.1-.1-.5-1.3-.7-1.7-.2-.5-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.1 1.6 2.5 3.9 3.5.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3Z"/></svg>` },
  { key:'YouTube', color:'#FF0000', svg:`<svg viewBox="0 0 24 24"><path fill="#fff" d="M22.5 6.4a2.9 2.9 0 0 0-2.05-2.06C18.6 4 12 4 12 4s-6.6 0-8.45.34A2.9 2.9 0 0 0 1.5 6.4 30 30 0 0 0 1.15 12a30 30 0 0 0 .35 5.6 2.9 2.9 0 0 0 2.05 2.06C5.4 20 12 20 12 20s6.6 0 8.45-.34a2.9 2.9 0 0 0 2.05-2.06 30 30 0 0 0 .35-5.6 30 30 0 0 0-.35-5.6ZM9.75 15.5v-7l6 3.5-6 3.5Z"/></svg>` },
  { key:'Telegram', color:'#26A5E4', svg:`<svg viewBox="0 0 24 24"><path fill="#fff" d="M21.5 4.5 2.9 11.8c-1.2.5-1.2 1.2-.2 1.5l4.8 1.5 1.8 5.6c.2.6.4.8.8.8.4 0 .6-.2.8-.5l2.5-2.5 4.9 3.6c.7.4 1.2.2 1.4-.7l3.3-15.5c.3-1-.3-1.5-1.5-1.1ZM8.5 14.3l9.3-5.9c.4-.3.8-.1.5.2l-7.9 7.1-.3 3-1.6-4.4Z"/></svg>` },
  { key:'TikTok', color:'#010101', svg:`<svg viewBox="0 0 24 24"><path fill="#fff" d="M16 3c.4 2 1.8 3.4 3.8 3.6v2.7c-1.4 0-2.7-.4-3.8-1.2v6.4a5.6 5.6 0 1 1-4.8-5.5v2.8a2.8 2.8 0 1 0 2 2.7V3H16Z"/></svg>` },
  { key:'Facebook', color:'#1877F2', svg:`<svg viewBox="0 0 24 24"><path fill="#fff" d="M13.5 21v-7.4h2.5l.4-2.9h-2.9V8.9c0-.8.2-1.4 1.4-1.4h1.6V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2h-2.5v2.9h2.5V21h3.1Z"/></svg>` },
  { key:'Instagram', color:'#E1306C', svg:`<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="#fff" stroke-width="1.7"/><circle cx="12" cy="12" r="4" fill="none" stroke="#fff" stroke-width="1.7"/><circle cx="17.2" cy="6.8" r="1.1" fill="#fff"/></svg>` },
  { key:'Pinterest', color:'#E60023', svg:`<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 2.5a9.5 9.5 0 0 0-3.5 18.3c0-.7 0-1.6.2-2.4l1.3-5.5s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.6 0 1-.6 2.4-.9 3.8-.3 1.1.6 2 1.7 2 2 0 3.5-2.1 3.5-5.2 0-2.7-1.9-4.6-4.7-4.6-3.2 0-5.1 2.4-5.1 4.9 0 1 .4 2 .8 2.6.1.1.1.2.1.3l-.3 1.3c0 .2-.2.2-.4.1-1.4-.6-2.2-2.6-2.2-4.2 0-3.4 2.5-6.6 7.2-6.6 3.8 0 6.7 2.7 6.7 6.3 0 3.8-2.4 6.8-5.7 6.8-1.1 0-2.2-.6-2.5-1.3l-.7 2.6c-.3 1-.9 2.2-1.4 3 1 .3 2 .5 3.1.5a9.5 9.5 0 0 0 0-19Z"/></svg>` },
  { key:'LinkedIn', color:'#0A66C2', svg:`<svg viewBox="0 0 24 24"><path fill="#fff" d="M6.9 8.5H3.6V20h3.3V8.5ZM5.25 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.4 20h-3.3v-5.9c0-1.4-.5-2.3-1.7-2.3-.9 0-1.5.6-1.7 1.2-.1.2-.1.6-.1.9V20H10.3s.05-10.6 0-11.5h3.3v1.6c.4-.7 1.2-1.7 3-1.7 2.2 0 3.8 1.4 3.8 4.5V20Z"/></svg>` },
  { key:'X / Twitter', color:'#000000', svg:`<svg viewBox="0 0 24 24"><path fill="#fff" d="M4 4l7 8.4L4.3 20H6l5.9-6.8L16.5 20H20l-7.4-8.9L19.9 4h-1.7l-5.4 6.3L8 4H4Zm2.5 1.3h1.8l9.2 13.4h-1.8L6.5 5.3Z"/></svg>` },
  { key:'Snapchat', color:'#FFFC00', svg:`<svg viewBox="0 0 24 24"><path fill="#111" d="M12 3.5c2.4 0 4 1.8 4 4.4 0 1 0 1.9.1 2.5.4.1 1 .3 1.4-.1.3-.3.8-.2.9.2.1.4-.2.8-.9 1.1-.4.2-.5.4-.4.7.3.7 1.3 1.6 2.5 1.9.3.1.4.5.1.8-.4.4-1.1.6-1.8.7-.1.2-.2.6-.3.9-.1.3-.4.4-.8.3-.6-.1-1.1-.1-1.6.1-.6.3-1.2 1-2.2 1s-1.6-.7-2.2-1c-.5-.2-1-.2-1.6-.1-.4.1-.7 0-.8-.3-.1-.3-.2-.7-.3-.9-.7-.1-1.4-.3-1.8-.7-.3-.3-.2-.7.1-.8 1.2-.3 2.2-1.2 2.5-1.9.1-.3 0-.5-.4-.7-.7-.3-1-.7-.9-1.1.1-.4.6-.5.9-.2.4.4 1 .2 1.4.1.1-.6.1-1.5.1-2.5 0-2.6 1.6-4.4 4-4.4Z"/></svg>` },
  { key:'Discord', color:'#5865F2', svg:`<svg viewBox="0 0 24 24"><path fill="#fff" d="M18.9 5.7A15.8 15.8 0 0 0 15 4.5l-.2.4c1.4.4 2.7 1 3.9 1.8a11.9 11.9 0 0 0-13.4 0c1.2-.8 2.5-1.4 3.9-1.8L9 4.5a15.8 15.8 0 0 0-3.9 1.2C2.9 9 2.2 12.2 2.5 15.3a15.9 15.9 0 0 0 4.8 2.4c.4-.5.7-1.1 1-1.7-.6-.2-1.1-.5-1.6-.8l.4-.3c3 1.4 6.3 1.4 9.3 0l.4.3c-.5.3-1 .6-1.6.8.3.6.6 1.2 1 1.7a15.8 15.8 0 0 0 4.8-2.4c.4-3.6-.6-6.7-2.1-9.6ZM9.7 13.4c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Zm4.6 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Z"/></svg>` },
  { key:'Reddit', color:'#FF4500', svg:`<svg viewBox="0 0 24 24"><path fill="#fff" d="M22 12a2 2 0 0 0-3.4-1.4 8.9 8.9 0 0 0-4.6-1.5l.8-3.6 2.5.6a1.5 1.5 0 1 0 .2-.8L14.7 4a.4.4 0 0 0-.5.3l-.9 4a9 9 0 0 0-4.7 1.5A2 2 0 1 0 6 13.1a3.8 3.8 0 0 0 0 .6c0 2.5 2.9 4.5 6.5 4.5s6.5-2 6.5-4.5a3.8 3.8 0 0 0 0-.6A2 2 0 0 0 22 12Zm-13 1.3a1.3 1.3 0 1 1 2.6 0 1.3 1.3 0 0 1-2.6 0Zm7 3a5.4 5.4 0 0 1-3 .8 5.4 5.4 0 0 1-3-.8.4.4 0 0 1 .5-.6c.7.5 1.6.7 2.5.7s1.8-.2 2.5-.7a.4.4 0 0 1 .5.6Zm-.4-1.7a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z"/></svg>` },
  { key:'Spotify', color:'#1DB954', svg:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" fill="none" stroke="#fff" stroke-width="1.6"/><path fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" d="M7 9.7c3.2-.9 6.8-.7 9.5.9M7.5 12.8c2.7-.7 5.6-.5 7.9.8M8 15.7c2.2-.5 4.5-.4 6.3.7"/></svg>` },
  { key:'Twitch', color:'#9146FF', svg:`<svg viewBox="0 0 24 24"><path fill="#fff" d="M4.5 3 3 6.5v13h5v2l3-2h3l5-4V3H4.5Zm14 9.5L15.5 15h-3l-2.5 2v-2h-3V4.7h11.5v7.8Z"/><path fill="#9146FF" d="M13.5 6.7h1.7v4.5h-1.7Zm-4 0h1.7v4.5H9.5Z"/></svg>` },
  { key:'Threads', color:'#000000', svg:`<svg viewBox="0 0 24 24"><path fill="#fff" d="M12.2 2C7 2 3.8 5.3 3.8 10.3c0 4 2 6.7 5.3 7.6-.2-.9-.3-1.9-.1-2.9-1.6-.7-2.5-2.1-2.5-4.1 0-3 1.9-4.9 5.4-4.9 3.6 0 5.6 2 5.6 5 0 2.3-1 4-2.7 4.6.1-.9-.1-1.8-.7-2.5-.5-.7-1.3-1.1-2.2-1.1-1.3 0-2.3.9-2.3 2.2 0 1.4 1.2 2.4 2.9 2.4 3.4 0 5.9-2.4 5.9-5.7 0-3.8-2.9-6.3-7.3-6.3-5.2 0-8.6 3.3-8.6 8.5C4.5 18 8 21 12.2 21c1.7 0 3.2-.4 4.4-1.1l-.6-1.6c-1 .6-2.2.9-3.7.9-3.3 0-5.9-2.2-5.9-6.9C6.4 8 8.8 5.6 12.2 5.6c3.4 0 5.4 2 5.4 4.9"/></svg>` },
];

const VERBS = {
  'WhatsApp':'Join channel', 'YouTube':'Subscribe', 'Telegram':'Join channel', 'TikTok':'Follow',
  'Facebook':'Follow page', 'Instagram':'Follow', 'Pinterest':'Follow', 'LinkedIn':'Follow',
  'X / Twitter':'Follow', 'Snapchat':'Add friend', 'Discord':'Join server', 'Reddit':'Join community',
  'Spotify':'Follow', 'Twitch':'Follow', 'Threads':'Follow'
};


let currentUnlock = { shortId:null, tokens:[], verified:new Set(), platforms:[], hasPw:false };

const $ = (id) => document.getElementById(id);
function escapeHtml(s){ const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }
function iconFor(key){ return PLATFORMS.find(p=>p.key===key); }
function icoHtml(key, cls){
  const i = iconFor(key);
  return `<span class="${cls || 'ico'}" style="background:${i?.color||'#333'}">${i?.svg||''}</span>`;
}
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function safeUrl(u){
  try{ const x = new URL(u); return (x.protocol === 'http:' || x.protocol === 'https:') ? x.href : null; }
  catch(e){ return null; }
}
function normalizeUrl(u){
  u = (u || '').trim();
  if(!u) return null;
  if(!/^[a-z][a-z0-9+.-]*:/i.test(u)) u = 'https://' + u;
  return safeUrl(u);
}
function hostOk(u){
  try{ const h = new URL(u).hostname; return h.includes('.') || h === 'localhost'; }catch(e){ return false; }
}
function hostOf(u){ try{ return new URL(u).host.replace(/^www\./,''); }catch(e){ return u; } }

async function api(path, body){
  const resp = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  let data = {};
  try{ data = await resp.json(); }catch(e){}
  return { ok: resp.ok, status: resp.status, data };
}

async function copyText(text){
  try{ await navigator.clipboard.writeText(text); return true; }
  catch(e){
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try{ ok = document.execCommand('copy'); }catch(_){}
    ta.remove();
    return ok;
  }
}

function toast(msg, action){
  const wrap = $('toasts');
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span>${escapeHtml(msg)}</span>`;
  const kill = ()=>{ t.classList.add('out'); setTimeout(()=>t.remove(), 260); };
  if(action){
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = action.label;
    b.addEventListener('click', ()=>{ action.fn(); kill(); });
    t.appendChild(b);
  }
  wrap.appendChild(t);
  setTimeout(kill, action ? 5000 : 2200);
}

/* ---------------- link + password fields ---------------- */


/* ================================================================
   DEMO MODE (sirf preview ke liye)
   - true  = koi backend nahi chahiye, neeche ka fake data use hota hai
   - false = asli /api/links/... endpoints use hote hain (Vercel par)
   ================================================================ */
const DEMO = false;
const DEMO_LINK = {
  platforms: ['YouTube', 'Instagram', 'Telegram'],   // kitne aur konse platforms dikhane hain
  platformUrls: {
    'YouTube': 'https://youtube.com',
    'Instagram': 'https://instagram.com',
    'Telegram': 'https://t.me'
  },
  hasPw: true,                                       // password box dekhna hai to true
  password: '1234',                                  // demo password
  destination: 'https://example.com/my-secret-file', // unlock ke baad ye link khulta hai
  waitMs: 3000                                       // "Wait 6s" ki jagah demo mein 3s
};

if (DEMO) {
  const realFetch = window.fetch.bind(window);
  const json = (obj, status = 200) =>
    Promise.resolve(new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } }));
  window.fetch = (url, opts = {}) => {
    const u = String(url);
    if (!u.startsWith('/api/links/')) return realFetch(url, opts);
    const body = opts.body ? JSON.parse(opts.body) : {};
    if (u.endsWith('/open'))   return json({ proof: 'demo-proof', waitMs: DEMO_LINK.waitMs });
    if (u.endsWith('/verify')) return json({ token: 'demo-token-' + body.platform });
    if (u.endsWith('/unlock')) {
      if (DEMO_LINK.hasPw && body.pw !== DEMO_LINK.password) return json({ error: 'Incorrect password. Try again.' }, 403);
      return json({ url: DEMO_LINK.destination });
    }
    return json({ platforms: DEMO_LINK.platforms, platformUrls: DEMO_LINK.platformUrls, hasPw: DEMO_LINK.hasPw });
  };
}


/* ---------------- unlock flow (visitors) ---------------- */
function sessionExpired(msg){
  toast(msg || 'Session expired. Reloading…');
  setTimeout(()=> location.reload(), 1400);
}

function updateProgress(){
  const total = currentUnlock.platforms.length;
  const done = currentUnlock.verified.size;
  $('progress').style.display = total ? 'block' : 'none';
  $('progText').textContent = `${done} of ${total} verified`;
  $('progBar').style.width = (total ? (done / total) * 100 : 0) + '%';
}

function showModalMessage(title, sub){
  $('verifyList').innerHTML = '';
  $('progress').style.display = 'none';
  $('pwWrap').style.display = 'none';
  $('unlockBtn').style.display = 'none';
  $('unlockTitle').textContent = title;
  $('modalSub').textContent = sub;
  $('modalBg').classList.add('show');
}

async function openUnlockByShortId(shortId){
  let info;
  try{
    const resp = await fetch(`/api/links/${encodeURIComponent(shortId)}`);
    if(!resp.ok){
      showModalMessage('Link not found', 'This locked link no longer exists.');
      return;
    }
    info = await resp.json();
  }catch(e){
    showModalMessage('Could not connect', 'Check your internet connection and reload the page.');
    return;
  }

  currentUnlock = { shortId, tokens:[], verified:new Set(), platforms: info.platforms, hasPw: info.hasPw };
  $('modal').classList.remove('done-state');
  $('lockBadge').classList.remove('open');
  $('unlockTitle').textContent = 'Unlock this link';
  $('modalSub').textContent = info.platforms.length || info.hasPw
    ? 'Open each link below, then confirm once you\'ve done it.'
    : 'No verification required — unlock to continue.';

  const verifyList = $('verifyList');
  verifyList.innerHTML = '';
  info.platforms.forEach(p=>{
    const row = document.createElement('div');
    row.className = 'verify-row';
    row.innerHTML = `<span class="name">${icoHtml(p)}<span class="name-text"><b>${escapeHtml(p)}</b><small>${escapeHtml(VERBS[p] || 'Follow')}</small></span></span>`;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'verify-btn';
    btn.textContent = 'Open & Verify';
    row.appendChild(btn);

    let state = 'idle';
    let proof = null;
    btn.addEventListener('click', async ()=>{
      if(state === 'idle'){
        state = 'waiting';
        // open synchronously inside the click so popup blockers allow it
        const target = safeUrl(info.platformUrls && info.platformUrls[p]);
        if(target) window.open(target, '_blank', 'noopener');
        btn.disabled = true;
        btn.textContent = 'Starting…';
        const r = await api(`/api/links/${encodeURIComponent(shortId)}/open`, { platform: p });
        if(!r.ok){
          if(r.status === 410){ return sessionExpired(r.data.error); }
          state = 'idle'; btn.disabled = false; btn.textContent = 'Retry'; return;
        }
        proof = r.data.proof;
        const waitMs = r.data.waitMs || 6000;
        let secs = Math.ceil(waitMs / 1000);
        btn.style.setProperty('--dur', waitMs + 'ms');
        btn.classList.add('waiting');
        btn.textContent = `Wait ${secs}s…`;
        const timer = setInterval(()=>{
          secs--;
          if(secs <= 0){
            clearInterval(timer);
            state = 'ready';
            btn.classList.remove('waiting');
            btn.classList.add('ready');
            btn.textContent = "I've done this ✓";
            btn.disabled = false;
          } else {
            btn.textContent = `Wait ${secs}s…`;
          }
        }, 1000);
      } else if(state === 'ready'){
        state = 'checking';
        btn.disabled = true;
        const r = await api(`/api/links/${encodeURIComponent(shortId)}/verify`, { platform: p, proof });
        if(r.ok){
          currentUnlock.verified.add(p);
          currentUnlock.tokens.push(r.data.token);
          state = 'done';
          btn.textContent = 'Verified ✓';
          btn.classList.remove('ready');
          btn.classList.add('done');
          row.classList.add('is-done');
          checkUnlockReady();
        } else if(r.status === 410){
          sessionExpired(r.data.error);
        } else {
          state = 'idle'; btn.disabled = false; btn.classList.remove('ready'); btn.textContent = 'Open & Verify';
        }
      }
    });
    verifyList.appendChild(row);
  });

  $('pwWrap').style.display = info.hasPw ? 'block' : 'none';
  $('unlockPw').value = '';
  $('unlockErr').classList.remove('show');
  $('reveal').className = 'reveal';
  $('unlockBtn').style.display = 'block';
  checkUnlockReady();
  $('modalBg').classList.add('show');
}

function checkUnlockReady(){
  const allVerified = currentUnlock.platforms.every(p=>currentUnlock.verified.has(p));
  $('unlockBtn').disabled = !allVerified;
  updateProgress();
}

function confetti(){
  if(reduceMotion) return;
  const layer = document.createElement('div');
  layer.className = 'confetti';
  const colors = ['#ffa21a','#ffb747','#3ee08a','#35d0ff','#ffffff'];
  for(let i = 0; i < 44; i++){
    const s = document.createElement('i');
    const ang = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 170;
    s.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
    s.style.setProperty('--dy', (Math.sin(ang) * dist - 70) + 'px');
    s.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
    s.style.background = colors[i % colors.length];
    s.style.animationDelay = (Math.random() * 0.12) + 's';
    layer.appendChild(s);
  }
  $('modal').appendChild(layer);
  setTimeout(()=> layer.remove(), 1900);
}

async function doUnlock(){
  const errEl = $('unlockErr');
  const btn = $('unlockBtn');
  if(btn.disabled) return;
  const pwVal = currentUnlock.hasPw ? $('unlockPw').value : null;
  btn.disabled = true;
  btn.textContent = 'Unlocking…';
  const r = await api(`/api/links/${encodeURIComponent(currentUnlock.shortId)}/unlock`, { tokens: currentUnlock.tokens, pw: pwVal });
  btn.textContent = 'Unlock link';
  btn.disabled = false;
  if(!r.ok){
    if(r.status === 410){ return sessionExpired(r.data.error); }
    errEl.textContent = r.data.error || 'Failed to unlock.';
    errEl.classList.add('show');
    const f = $('unlockPw');
    if(currentUnlock.hasPw){ f.classList.remove('shake'); void f.offsetWidth; f.classList.add('shake'); f.focus(); }
    return;
  }

  errEl.classList.remove('show');
  const dest = safeUrl(r.data.url);
  const rev = $('reveal');
  rev.className = 'reveal show';
  if(dest){
    rev.innerHTML = `
      <div class="rev-title">Unlocked</div>
      <div class="rev-host">${escapeHtml(hostOf(dest))}</div>
      <div class="rev-actions">
        <a class="rev-open" href="${escapeHtml(dest)}" target="_blank" rel="noopener noreferrer">Open link</a>
        <button type="button" class="rev-copy" id="revCopy">Copy</button>
      </div>`;
    $('revCopy').addEventListener('click', async ()=>{
      toast((await copyText(dest)) ? 'Link copied' : 'Could not copy');
    });
  } else {
    rev.innerHTML = '<div class="rev-title">Unlocked</div><div class="rev-host">But the destination link is invalid.</div>';
  }
  btn.style.display = 'none';
  $('modal').classList.add('done-state');
  $('unlockTitle').textContent = 'All set';
  $('modalSub').textContent = 'The link is unlocked.';
  $('lockBadge').classList.add('open');
  confetti();
}
$('unlockBtn').addEventListener('click', doUnlock);
$('unlockPw').addEventListener('keydown', e=>{ if(e.key === 'Enter'){ e.preventDefault(); doUnlock(); } });

function closeModal(){
  if(document.body.classList.contains('shared')) return;
  $('modalBg').classList.remove('show');
}
$('closeX').addEventListener('click', closeModal);
$('modalBg').addEventListener('click', (e)=>{ if(e.target.id === 'modalBg') closeModal(); });



/* ---------------- start ---------------- */
// Asli site par: URL /aB3xK9 se short id leta hai. Demo mein seedha "demo" id use hoti hai.
(function start(){
  const m = location.pathname.match(/^\/(?:l\/)?([A-Za-z0-9_-]{4,12})\/?$/);
  const id = DEMO ? 'demo' : (m && m[1]);
  if (id) openUnlockByShortId(id);
  else showModalMessage('Link not found', 'This locked link no longer exists.');
})();

