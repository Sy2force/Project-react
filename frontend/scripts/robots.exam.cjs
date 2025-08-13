// [EXAM] Génération automatique du robots.txt
const fs = require("fs");
const path = require("path");

const base = process.env.SITE_URL || "http://localhost:3002";

const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${base}/sitemap.xml

# Disallow admin pages
Disallow: /admin
Disallow: /dashboard

# Allow important pages
Allow: /
Allow: /projects
Allow: /blog
Allow: /contact
Allow: /about
`;

const distPath = path.join(process.cwd(), "dist");
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

fs.writeFileSync(path.join(distPath, "robots.txt"), robotsContent);
console.log("✅ Robots.txt généré avec succès dans dist/robots.txt");
