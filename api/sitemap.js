// Served at /sitemap.xml (see vercel.json rewrites).
// Only the home page is listed: locked links (/aB3xK9) are private and must not be indexed.
const { baseUrl, LASTMOD } = require('../lib/site');

module.exports = (req, res) => {
  const base = baseUrl(req);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.end(body);
};
