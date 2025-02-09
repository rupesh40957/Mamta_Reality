import connectDB from "../../middleware/mangoose";
import PropertyListing from "../../models/Property";
import Blog from "../../models/Blogs";
import { format } from "date-fns";

const siteUrl = process.env.DOMAIN ; // 🚀 Change to your live domain




const handler = async (req, res) => {
  try {

    // Ensure we are fetching correct fields (check if 'slug' exists in DB)
    const properties = await PropertyListing.find({}, { slug: 1, updatedAt: 1 });
    const blogs = await Blog.find({}, { slug: 1, createdAt: 1 });

    res.setHeader("Content-Type", "application/xml");
    res.write(generateSitemap(properties, blogs));
    res.end();
  } catch (error) {
    console.error("Sitemap generation error:", error);
    res.status(500).json({ message: "Error generating sitemap" });
  }
};

function generateSitemap(properties, blogs) {
  const staticPages = [
    { loc: "/", priority: "1.0", changefreq: "daily" },
    { loc: "/properties", priority: "0.9", changefreq: "weekly" },
    { loc: "/blog", priority: "0.9", changefreq: "weekly" },
    { loc: "/contact", priority: "0.7", changefreq: "yearly" },
    { loc: "/about", priority: "0.8", changefreq: "monthly" }
  ];

  let urls = staticPages.map(page => `
    <url>
      <loc>${siteUrl}${page.loc}</loc>
      <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `);

  // 🏡 Ensure properties have valid slugs
  urls.push(
    ...properties
      .filter(prop => prop.slug) // 🚀 Ignore properties with missing slug
      .map(prop => `
      <url>
        <loc>${siteUrl}/properties/${prop.slug}</loc>
        <lastmod>${format(new Date(prop.updatedAt), "yyyy-MM-dd")}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>
    `)
  );

  // 📝 Ensure blogs have valid slugs
  urls.push(
    ...blogs
      .filter(blog => blog.slug) // 🚀 Ignore blogs with missing slug
      .map(blog => `
      <url>
        <loc>${siteUrl}/blog/${blog.slug}</loc>
        <lastmod>${format(new Date(blog.createdAt), "yyyy-MM-dd")}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `)
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("\n")}
  </urlset>`;
}

export default connectDB(handler); // Ensure DB connection
