// Served at /robots.txt (see vercel.json rewrites). Uses plain Node res so it also works in server.js.
const { baseUrl } = require('../lib/site');

module.exports = (req, res) => {
  const base = baseUrl(req);
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /l/',
    '',
    `Sitemap: ${base}/sitemap.xml`,
    ''
  ].join('\n');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.end(body);
};
