// Shared helpers for the SEO endpoints (robots.txt / sitemap.xml).
// Same base-URL rule as the link generator: PUBLIC_URL if set, otherwise the request host.

// Update this date when you change the home page (used in sitemap.xml).
const LASTMOD = '2026-10-20';

// Production domain. PUBLIC_URL (env) overrides it; previews and local dev use the request host.
const DEFAULT_URL = 'https://aman-sub4unlock.vercel.app';

function baseUrl(req) {
  if (process.env.PUBLIC_URL) return process.env.PUBLIC_URL.replace(/\/+$/, '');
  if (process.env.VERCEL_ENV === 'production') return DEFAULT_URL;
  const proto = String(req.headers['x-forwarded-proto'] || 'http').split(',')[0];
  const host = String(req.headers['x-forwarded-host'] || req.headers.host).split(',')[0];
  return `${proto}://${host}`;
}

module.exports = { baseUrl, LASTMOD, DEFAULT_URL };
