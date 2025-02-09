// pages/api/auth/admin/blogs-listing.js

import connectDB from "../../../../middleware/mangoose";
import Blog from "../../../../models/Blogs"; // Mongoose model for Blog posts
import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import { IncomingForm } from "formidable"; // For parsing multipart/form-data
import sharp from "sharp";
import { spawn } from "child_process";
import ffmpegPath from "ffmpeg-static"; // Prebuilt ffmpeg binary via npm

// Disable built-in body parser to use formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper: Ensure a directory exists; if not, create it.
const ensureDirExists = async (dir) => {
  try {
    await fs.access(dir);
  } catch (error) {
    await fs.mkdir(dir, { recursive: true });
  }
};

// Helper: Compress image using sharp
const compressImage = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .resize({ width: 800, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(outputPath);
    return outputPath;
  } catch (err) {
    console.error("Image compression error:", err);
    throw err;
  }
};

// Helper: Compress video using ffmpeg
const compressVideo = async (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn(ffmpegPath, [
      "-i", inputPath,
      "-vcodec", "libx265",
      "-crf", "28",
      outputPath,
    ]);

    ffmpeg.on("error", (err) => {
      console.error("FFmpeg error:", err);
      reject(err);
    });

    ffmpeg.on("close", (code) => {
      if (code === 0) {
        resolve(outputPath);
      } else {
        reject(new Error(`FFmpeg exited with code ${code}`));
      }
    });
  });
};

// Helper: Normalize field value (agar value array hai to first element return karein)
const normalizeField = (value) => {
  return Array.isArray(value) ? value[0] : value;
};

// Updated validation function for Blog posts.
// Ab hum title aur description ko required fields ke roop mein check kar rahe hain.
// Category ko optional bana diya gaya hai.
const validateInput = (data) => {
  const title = normalizeField(data.title);
  const description = normalizeField(data.description);
  // Optional fields
  const category = data.category ? normalizeField(data.category) : "";
  const excerpt = data.excerpt ? normalizeField(data.excerpt) : "";
  const author = data.author ? normalizeField(data.author) : "";
  let tags = data.tags;
  if (tags && typeof tags === "string") {
    tags = tags.split(",").map((t) => t.trim());
  }
  if (!title || !description) {
    throw new Error("Missing required fields: title and description");
  }
  return { title, description, category, excerpt, author, tags };
};

const MAX_SKIP = 17825792;

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
        const skipValue = (pageNumber - 1) * limitNumber;
        if (skipValue > MAX_SKIP) {
          return res.status(400).json({ message: "Page value too high, offset out of range" });
        }
        const blogs = await Blog.find({}).skip(skipValue).limit(limitNumber);
        const total = await Blog.countDocuments({});
        return res.status(200).json({ total, blogs });
      }

      case "POST": {
        // Ensure temporary folder exists
        const tmpDir = path.join(process.cwd(), "tmp");
        await ensureDirExists(tmpDir);

        const form = new IncomingForm();
        form.uploadDir = tmpDir;
        form.keepExtensions = true;

        form.parse(req, async (err, fields, files) => {
          if (err) {
            console.error("Error parsing form data:", err);
            return res.status(500).json({ message: "Error parsing form data" });
          }
          try {
            // Validate and normalize text fields using the updated function
            let data = validateInput(fields);
            // If excerpt is not provided, set a default excerpt (first 200 characters)
            if (!data.excerpt) {
              data.excerpt = data.description.substring(0, 200);
            }

            // Prepare upload directories
            const imageUploadDir = path.join(process.cwd(), "public", "uploads", "blogs", "images");
            const videoUploadDir = path.join(process.cwd(), "public", "uploads", "blogs", "videos");
            await ensureDirExists(imageUploadDir);
            await ensureDirExists(videoUploadDir);

            // Process image file (if provided)
            let processedImages = [];
            if (files.image) {
              const imagesArray = Array.isArray(files.image) ? files.image : [files.image];
              for (const file of imagesArray) {
                const outputName = `${Date.now()}_${file.originalFilename}`;
                const outputPath = path.join(imageUploadDir, outputName);
                await compressImage(file.filepath, outputPath);
                processedImages.push(path.join("/uploads", "blogs", "images", outputName));
              }
            }
            data.image = processedImages.length > 0 ? processedImages[0] : "";

            // Process video file (if provided)
            let processedVideos = [];
            if (files.video) {
              const videosArray = Array.isArray(files.video) ? files.video : [files.video];
              for (const file of videosArray) {
                const outputName = `${Date.now()}_${file.originalFilename}`;
                const outputPath = path.join(videoUploadDir, outputName);
                await compressVideo(file.filepath, outputPath);
                processedVideos.push(path.join("/uploads", "blogs", "videos", outputName));
              }
            }
            data.videos = processedVideos;

            // Create new blog document
            const blog = new Blog(data);
            await blog.validate();
            const savedBlog = await blog.save();
            return res.status(201).json({ message: "Blog added successfully", blog: savedBlog });
          } catch (error) {
            console.error("Error processing POST:", error);
            return res.status(400).json({ message: "Validation failed", error: error.message });
          }
        });
        break;
      }

      case "PUT": {
        const { id } = req.query;
        console.log(id);
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid blog ID" });
        }
        const tmpDir = path.join(process.cwd(), "tmp");
        await ensureDirExists(tmpDir);

        const form = new IncomingForm();
        form.uploadDir = tmpDir;
        form.keepExtensions = true;

        form.parse(req, async (err, fields, files) => {
          if (err) {
            console.error("Error parsing form data:", err);
            return res.status(500).json({ message: "Error parsing form data" });
          }
          try {
            let data = validateInput(fields);
            const imageUploadDir = path.join(process.cwd(), "public", "uploads", "blogs", "images");
            const videoUploadDir = path.join(process.cwd(), "public", "uploads", "blogs", "videos");
            await ensureDirExists(imageUploadDir);
            await ensureDirExists(videoUploadDir);

            let processedImages = [];
            if (files.image) {
              const imagesArray = Array.isArray(files.image) ? files.image : [files.image];
              for (const file of imagesArray) {
                const outputName = `${Date.now()}_${file.originalFilename}`;
                const outputPath = path.join(imageUploadDir, outputName);
                await compressImage(file.filepath, outputPath);
                processedImages.push(path.join("/uploads", "blogs", "images", outputName));
              }
            }
            if (processedImages.length > 0) {
              data.image = processedImages[0];
            }

            let processedVideos = [];
            if (files.video) {
              const videosArray = Array.isArray(files.video) ? files.video : [files.video];
              for (const file of videosArray) {
                const outputName = `${Date.now()}_${file.originalFilename}`;
                const outputPath = path.join(videoUploadDir, outputName);
                await compressVideo(file.filepath, outputPath);
                processedVideos.push(path.join("/uploads", "blogs", "videos", outputName));
              }
            }
            if (processedVideos.length > 0) {
              data.videos = processedVideos;
            }

            const updatedBlog = await Blog.findByIdAndUpdate(id, data, { new: true, runValidators: true });
            if (!updatedBlog) {
              return res.status(404).json({ message: "Blog not found" });
            }
            return res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
          } catch (error) {
            console.error("Error processing PUT:", error);
            return res.status(400).json({ message: "Validation failed", error: error.message });
          }
        });
        break;
      }

      case "DELETE": {
        const { id } = req.query;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid blog ID" });
        }
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
          return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json({ message: "Blog deleted successfully" });
      }

      default:
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default connectDB(handler);
