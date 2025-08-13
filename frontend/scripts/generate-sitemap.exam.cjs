// [EXAM] Génération automatique du sitemap
const fs = require("fs");
const path = require("path");

const p = (u) => `<url><loc>${u}</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`;

const base = process.env.SITE_URL || "http://localhost:3002";
const urls = [
  "/",
  "/projects", 
  "/blog", 
  "/contact", 
  "/about",
  "/login", 
  "/register"
].map(u => base + u);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(p).join("")}
</urlset>`;

const distPath = path.join(process.cwd(), "dist");
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

fs.writeFileSync(path.join(distPath, "sitemap.xml"), xml);
console.log("✅ Sitemap généré avec succès dans dist/sitemap.xml");
