import connectDB from "../../../../middleware/mangoose";
import Blog from "../../../../models/Blogs";
import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import { IncomingForm } from "formidable";
import sharp from "sharp";

export const config = {
  api: { bodyParser: false },
};

const ensureDirExists = async (dir) => {
  try { await fs.access(dir); }
  catch (error) { await fs.mkdir(dir, { recursive: true }); }
};

const compressImage = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath).resize({ width: 800, withoutEnlargement: true })
      .jpeg({ quality: 80 }).toFile(outputPath);
    return outputPath;
  } catch (err) {
    console.error("Image compression error:", err);
    throw err;
  }
};

const validateInput = (data) => {
  const title = data.title?.[0] || "";
  const description = data.description?.[0] || "";
  if (!title || !description) throw new Error("Missing required fields: title and description");
  return {
    title, description,
    category: data.category?.[0] || "",
    excerpt: data.excerpt?.[0] || description.substring(0, 200),
    author: data.author?.[0] || "",
    tags: data.tags?.[0]?.split(",").map(t => t.trim()) || []
  };
};

const handler = async (req, res) => {
  console.log(`${req.method} request received`);
  try {
    switch (req.method) {
      case "GET": {
        let { page = "1", limit = "10" } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
          return res.status(400).json({ message: "Invalid pagination parameters" });
        }
        const blogs = await Blog.find({}).skip((pageNumber - 1) * limitNumber).limit(limitNumber);
        const total = await Blog.countDocuments({});
        return res.status(200).json({ total, blogs });
      }
      case "POST": {
        const form = new IncomingForm({ keepExtensions: true });
        form.parse(req, async (err, fields, files) => {
          if (err) return res.status(500).json({ message: "Error parsing form data" });
          try {
            let data = validateInput(fields);
            const imageUploadDir = path.join(process.cwd(), "public/uploads/blogs/images");
            await ensureDirExists(imageUploadDir);
            if (files.image) {
              const file = files.image[0];
              const outputPath = path.join(imageUploadDir, `${Date.now()}_${file.originalFilename}`);
              await compressImage(file.filepath, outputPath);
              data.image = `/uploads/blogs/images/${path.basename(outputPath)}`;
            }
            const blog = new Blog(data);
            await blog.validate();
            const savedBlog = await blog.save();
            return res.status(201).json({ message: "Blog added successfully", blog: savedBlog });
          } catch (error) {
            return res.status(400).json({ message: "Validation failed", error: error.message });
          }
        });
        break;
      }
      case "PUT": {
        const { id } = req.query;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid blog ID" });
        const form = new IncomingForm({ keepExtensions: true });
        form.parse(req, async (err, fields, files) => {
          if (err) return res.status(500).json({ message: "Error parsing form data" });
          try {
            let data = validateInput(fields);
            if (files.image) {
              const imageUploadDir = path.join(process.cwd(), "public/uploads/blogs/images");
              await ensureDirExists(imageUploadDir);
              const file = files.image[0];
              const outputPath = path.join(imageUploadDir, `${Date.now()}_${file.originalFilename}`);
              await compressImage(file.filepath, outputPath);
              data.image = `/uploads/blogs/images/${path.basename(outputPath)}`;
            }
            const updatedBlog = await Blog.findByIdAndUpdate(id, data, { new: true, runValidators: true });
            if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
            return res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
          } catch (error) {
            return res.status(400).json({ message: "Validation failed", error: error.message });
          }
        });
        break;
      }
      case "DELETE": {
        const { id } = req.query;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid blog ID" });
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });
        return res.status(200).json({ message: "Blog deleted successfully" });
      }
      default:
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default connectDB(handler);
