// Local development server (not used on Vercel). Run: node server.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const h = require('./lib/handlers');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'public', 'index.html');
const UNLOCK_DIR = path.join(__dirname, 'public', 'unlock-page');
const UNLOCK = path.join(UNLOCK_DIR, 'unlock.html');
const TYPES = { '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.html': 'text/html; charset=utf-8' };
const CSS_DIR = path.join(__dirname, 'public', 'css');

http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://x').pathname;
  let m;
  if ((m = pathname.match(/^\/api\/links\/?$/))) { req.query = {}; return h.create(req, res); }
  if ((m = pathname.match(/^\/api\/links\/([^/]+)\/?$/))) { req.query = { id: m[1] }; return h.info(req, res); }
  if ((m = pathname.match(/^\/api\/links\/([^/]+)\/([^/]+)\/?$/))) { req.query = { id: m[1], action: m[2] }; return h.action(req, res); }

  if ((m = pathname.match(/^\/css\/([A-Za-z0-9_-]+\.css)$/)) && fs.existsSync(path.join(CSS_DIR, m[1]))) {
    res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
    return res.end(fs.readFileSync(path.join(CSS_DIR, m[1])));
  }

  if (pathname === '/robots.txt') return require('./api/robots')(req, res);
  if (pathname === '/sitemap.xml') return require('./api/sitemap')(req, res);

  // unlock page assets: /unlock-page/unlock.css, /unlock-page/unlock.js
  if ((m = pathname.match(/^\/unlock-page\/(unlock\.(?:css|js|html))$/))) {
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(m[1])] });
    return res.end(fs.readFileSync(path.join(UNLOCK_DIR, m[1])));
  }

  // home page (link generator)
  if (pathname === '/' || pathname === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(fs.readFileSync(INDEX));
  }

  // short link /aB3xK9 or /l/aB3xK9 -> unlock page
  if (/^\/(l\/)?[A-Za-z0-9_-]+\/?$/.test(pathname)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' });
    return res.end(fs.readFileSync(UNLOCK));
  }
  res.writeHead(404); res.end('Not found');
}).listen(PORT, () => console.log(`Sub4Unlock dev server: http://localhost:${PORT}`));
