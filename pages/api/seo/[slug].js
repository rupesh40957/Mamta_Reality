import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: "Missing slug parameter" });
  }

  // Dummy SEO metadata for testing
  const seoData = {
    title: `SEO for ${slug}`,
    description: `This is an SEO description for ${slug}`,
    keywords: `real estate, property, ${slug}`,
  };

  res.status(200).json(seoData);
}
