  // // pages/api/auth/admin/property-listing.js

  // import connectDB from "../../../../middleware/mangoose";
  // import PropertyListing from "../../../../models/Property";
  // import mongoose from "mongoose";
  // import fs from "fs/promises";
  // import path from "path";
  // import { IncomingForm } from "formidable"; // For multipart/form-data parsing
  // import sharp from "sharp";
  // import { spawn } from "child_process";
  // import ffmpegPath from "ffmpeg-static";

  // // Disable built-in body parser to use formidable for multipart/form-data
  // export const config = {
  //   api: {
  //     bodyParser: false,
  //   },
  // };

  // // Helper: Ensure a directory exists; if not, create it.
  // const ensureDirExists = async (dir) => {
  //   try {
  //     await fs.access(dir);
  //   } catch (error) {
  //     await fs.mkdir(dir, { recursive: true });
  //   }
  // };

  // // Helper: Compress image using sharp
  // const compressImage = async (inputPath, outputPath) => {
  //   try {
  //     await sharp(inputPath)
  //       .resize({ width: 800, withoutEnlargement: true }) // Adjust width as needed
  //       .jpeg({ quality: 80 }) // Adjust quality as needed
  //       .toFile(outputPath);
  //     return outputPath;
  //   } catch (err) {
  //     console.error("Image compression error:", err);
  //     throw err;
  //   }
  // };

  // // Helper: Compress video using ffmpeg (using ffmpeg-static)
  // const compressVideo = async (inputPath, outputPath) => {
  //   return new Promise((resolve, reject) => {
  //     const ffmpeg = spawn(ffmpegPath, [
  //       "-i", inputPath,
  //       "-vcodec", "libx265",
  //       "-crf", "28",
  //       outputPath,
  //     ]);

  //     ffmpeg.on("error", (err) => {
  //       console.error("FFmpeg error:", err);
  //       reject(err);
  //     });

  //     ffmpeg.on("close", (code) => {
  //       if (code === 0) {
  //         resolve(outputPath);
  //       } else {
  //         reject(new Error(`FFmpeg exited with code ${code}`));
  //       }
  //     });
  //   });
  // };

  // // Helper: Normalize field value. Agar value array hai, to pehla element return karein.
  // const normalizeField = (value) => {
  //   return Array.isArray(value) ? value[0] : value;
  // };

  // // Validate and normalize text fields from form data
  // const validateInput = (data) => {
  //   const name = normalizeField(data.name);
  //   const location = normalizeField(data.location);
  //   const price = normalizeField(data.price);
  //   const size = normalizeField(data.size);
  //   const baths = normalizeField(data.baths);
  //   const propertyType = normalizeField(data.propertyType);
  //   const description = normalizeField(data.description);
  //   const projectType = normalizeField(data.projectType);

  //   // Process amenities: agar string hai, to comma-separated list mein convert karo.
  //   let amenities = data.amenities[0];
  //   if (amenities && typeof amenities === "string") {
  //     amenities = amenities.split(",").map((a) => a.trim());
  //   }

  //   if (!name || !location || !price || !size || !baths || !propertyType || !description) {
  //     throw new Error(
  //       "Missing required fields: name, location, price, size, baths, propertyType, or description"
  //     );
  //   }

  //   return { name, location, price, size, baths, propertyType, description, amenities, projectType };
  // };

  // // Maximum allowed skip offset. Adjust as needed.
  // const MAX_SKIP = 19825792;

  // const handler = async (req, res) => {
  //   try {
  //     switch (req.method) {
  //       case "GET": {
  //         // Parse pagination parameters
  //         let { page = "1", limit = "10" } = req.query;
  //         const pageNumber = parseInt(page, 10);
  //         const limitNumber = parseInt(limit, 10);

  //         if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
  //           return res.status(400).json({ message: "Invalid pagination parameters" });
  //         }

  //         const skipValue = (pageNumber - 1) * limitNumber;
  //         if (skipValue > MAX_SKIP) {
  //           return res.status(400).json({ message: "Page value too high, offset out of range" });
  //         }

  //         const properties = await PropertyListing.find({})
  //           .skip(skipValue)
  //           .limit(limitNumber);
  //         const total = await PropertyListing.countDocuments({});
  //         return res.status(200).json({ total, properties });
  //       }

  //       case "POST": {
  //         // Ensure temporary upload folder exists
  //         const tmpDir = path.join(process.cwd(), "tmp");
  //         await ensureDirExists(tmpDir);

  //         const form = new IncomingForm();
  //         form.uploadDir = tmpDir;
  //         form.keepExtensions = true;

  //         form.parse(req, async (err, fields, files) => {
  //           if (err) {
  //             console.error("Error parsing form data:", err);
  //             return res.status(500).json({ message: "Error parsing form data" });
  //           }

  //           try {
  //             let data = validateInput(fields);

  //             // Default projectType if not provided
  //             if (!data.projectType) {
  //               data.projectType = "Featured Projects";
  //             }

  //             // Prepare directories for uploads
  //             const imageUploadDir = path.join(process.cwd(), "public", "uploads", "images");
  //             const videoUploadDir = path.join(process.cwd(), "public", "uploads", "videos");
  //             await ensureDirExists(imageUploadDir);
  //             await ensureDirExists(videoUploadDir);

  //             // Process Images
  //             let processedImages = [];
  //             if (files.images) {
  //               const imagesArray = Array.isArray(files.images) ? files.images : [files.images];
  //               for (const file of imagesArray) {
  //                 const outputName = `${Date.now()}_${file.originalFilename}`;
  //                 const outputPath = path.join(imageUploadDir, outputName);
  //                 await compressImage(file.filepath, outputPath);
  //                 // Save relative path, e.g., "/uploads/images/filename.jpg"
  //                 processedImages.push(path.join("/uploads", "images", outputName));
  //               }
  //             }
  //             data.images = processedImages;

  //             // Process Videos
  //             let processedVideos = [];
  //             if (files.videos) {
  //               const videosArray = Array.isArray(files.videos) ? files.videos : [files.videos];
  //               for (const file of videosArray) {
  //                 const outputName = `${Date.now()}_${file.originalFilename}`;
  //                 const outputPath = path.join(videoUploadDir, outputName);
  //                 await compressVideo(file.filepath, outputPath);
  //                 processedVideos.push(path.join("/uploads", "videos", outputName));
  //               }
  //             }
  //             data.videos = processedVideos;

  //             // Create and save new property document
  //             const property = new PropertyListing(data);
  //             await property.validate();
  //             const savedProperty = await property.save();
  //             return res
  //               .status(201)
  //               .json({ message: "Property added successfully", property: savedProperty });
  //           } catch (error) {
  //             console.error("Error processing POST:", error);
  //             return res.status(400).json({
  //               message: "Validation failed",
  //               error: error.message,
  //             });
  //           }
  //         });
  //         break;
  //       }

  //       case "PUT": {
  //         const { id } = req.query;
  //         if (!mongoose.Types.ObjectId.isValid(id)) {
  //           return res.status(400).json({ message: "Invalid property ID" });
  //         }

  //         // Ensure temporary upload folder exists
  //         const tmpDir = path.join(process.cwd(), "tmp");
  //         await ensureDirExists(tmpDir);

  //         const form = new IncomingForm();
  //         form.uploadDir = tmpDir;
  //         form.keepExtensions = true;

  //         form.parse(req, async (err, fields, files) => {
  //           if (err) {
  //             console.error("Error parsing form data:", err);
  //             return res.status(500).json({ message: "Error parsing form data" });
  //           }

  //           try {
  //             let data = validateInput(fields);
  //             if (!data.projectType) {
  //               data.projectType = "Featured Projects";
  //             }

  //             const imageUploadDir = path.join(process.cwd(), "public", "uploads", "images");
  //             const videoUploadDir = path.join(process.cwd(), "public", "uploads", "videos");
  //             await ensureDirExists(imageUploadDir);
  //             await ensureDirExists(videoUploadDir);

  //             // Process Images if provided
  //             let processedImages = [];
  //             if (files.images) {
  //               const imagesArray = Array.isArray(files.images) ? files.images : [files.images];
  //               for (const file of imagesArray) {
  //                 const outputName = `${Date.now()}_${file.originalFilename}`;
  //                 const outputPath = path.join(imageUploadDir, outputName);
  //                 await compressImage(file.filepath, outputPath);
  //                 processedImages.push(path.join("/uploads", "images", outputName));
  //               }
  //             }
  //             if (processedImages.length > 0) {
  //               data.images = processedImages;
  //             }

  //             // Process Videos if provided
  //             let processedVideos = [];
  //             if (files.videos) {
  //               const videosArray = Array.isArray(files.videos) ? files.videos : [files.videos];
  //               for (const file of videosArray) {
  //                 const outputName = `${Date.now()}_${file.originalFilename}`;
  //                 const outputPath = path.join(videoUploadDir, outputName);
  //                 await compressVideo(file.filepath, outputPath);
  //                 processedVideos.push(path.join("/uploads", "videos", outputName));
  //               }
  //             }
  //             if (processedVideos.length > 0) {
  //               data.videos = processedVideos;
  //             }

  //             const updatedProperty = await PropertyListing.findByIdAndUpdate(id, data, {
  //               new: true,
  //               runValidators: true,
  //             });

  //             if (!updatedProperty) {
  //               return res.status(404).json({ message: "Property not found" });
  //             }

  //             return res
  //               .status(200)
  //               .json({ message: "Property updated successfully", property: updatedProperty });
  //           } catch (error) {
  //             console.error("Error processing PUT:", error);
  //             return res.status(400).json({
  //               message: "Validation failed",
  //               error: error.message,
  //             });
  //           }
  //         });
  //         break;
  //       }

  //       case "DELETE": {
  //         const { id } = req.query;
  //         if (!mongoose.Types.ObjectId.isValid(id)) {
  //           return res.status(400).json({ message: "Invalid property ID" });
  //         }

  //         const deletedProperty = await PropertyListing.findByIdAndDelete(id);
  //         if (!deletedProperty) {
  //           return res.status(404).json({ message: "Property not found" });
  //         }

  //         return res.status(200).json({ message: "Property deleted successfully" });
  //       }

  //       default:
  //         return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  //     }
  //   } catch (error) {
  //     console.error("Server error:", error);
  //     return res.status(500).json({ message: "Internal server error", error: error.message });
  //   }
  // };

  // export default connectDB(handler);



  import connectDB from "../../../../middleware/mangoose";
  import PropertyListing from "../../../../models/Property";
  import mongoose from "mongoose";
  import path from "path";
  import { IncomingForm } from "formidable"; // For multipart/form-data parsing
  import cloudinary from "cloudinary";
  
  // Configure Cloudinary using environment variables
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  // Disable built-in body parser to use formidable for multipart/form-data
  export const config = {
    api: {
      bodyParser: false,
    },
  };
  
  // Helper: Normalize field value. Agar value array ho, to pehla element return karein.
  const normalizeField = (value) => {
    return Array.isArray(value) ? value[0] : value;
  };
  
  // Validate and normalize text fields from form data
  const validateInput = (data) => {
    const name = normalizeField(data.name);
    const location = normalizeField(data.location);
    const price = normalizeField(data.price);
    const size = normalizeField(data.size);
    const baths = normalizeField(data.baths);
    const propertyType = normalizeField(data.propertyType);
    const description = normalizeField(data.description);
    const projectType = normalizeField(data.projectType);
  
    // Process amenities: agar string ho, to comma-separated list mein convert karein.
    let amenities = data.amenities && data.amenities[0];
    if (amenities && typeof amenities === "string") {
      amenities = amenities.split(",").map((a) => a.trim());
    }
  
    if (!name || !location || !price || !size || !baths || !propertyType || !description) {
      throw new Error(
        "Missing required fields: name, location, price, size, baths, propertyType, or description"
      );
    }
  
    return { name, location, price, size, baths, propertyType, description, amenities, projectType };
  };
  
  // Maximum allowed skip offset. Adjust as needed.
  const MAX_SKIP = 19825792;
  
  const handler = async (req, res) => {
    try {
      switch (req.method) {
        case "GET": {
          // Parse pagination parameters
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
  
          const properties = await PropertyListing.find({})
            .skip(skipValue)
            .limit(limitNumber);
          const total = await PropertyListing.countDocuments({});
          return res.status(200).json({ total, properties });
        }
  
        case "POST": {
          const form = new IncomingForm();
          // Keep extensions to preserve original file types
          form.keepExtensions = true;
  
          form.parse(req, async (err, fields, files) => {
            if (err) {
              console.error("Error parsing form data:", err);
              return res.status(500).json({ message: "Error parsing form data" });
            }
  
            try {
              let data = validateInput(fields);
  
              // Set default projectType if not provided
              if (!data.projectType) {
                data.projectType = "Featured Projects";
              }
  
              // Process Images using Cloudinary
              let processedImages = [];
              if (files.images) {
                const imagesArray = Array.isArray(files.images) ? files.images : [files.images];
                for (const file of imagesArray) {
                  // Upload image to Cloudinary with optional transformation (e.g., width 800, auto quality)
                  const result = await cloudinary.uploader.upload(file.filepath, {
                    folder: "properties/images",
                    transformation: { width: 800, quality: "auto" },
                  });
                  processedImages.push(result.secure_url);
                }
              }
              data.images = processedImages;
  
              // Process Videos using Cloudinary (resource_type must be set to "video")
              let processedVideos = [];
              if (files.videos) {
                const videosArray = Array.isArray(files.videos) ? files.videos : [files.videos];
                for (const file of videosArray) {
                  const result = await cloudinary.uploader.upload(file.filepath, {
                    folder: "properties/videos",
                    resource_type: "video",
                  });
                  processedVideos.push(result.secure_url);
                }
              }
              data.videos = processedVideos;
  
              // Create and save new property document in MongoDB
              const property = new PropertyListing(data);
              await property.validate();
              const savedProperty = await property.save();
              return res
                .status(201)
                .json({ message: "Property added successfully", property: savedProperty });
            } catch (error) {
              console.error("Error processing POST:", error);
              return res.status(400).json({
                message: "Validation failed",
                error: error.message,
              });
            }
          });
          break;
        }
  
        case "PUT": {
          const { id } = req.query;
          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid property ID" });
          }
  
          const form = new IncomingForm();
          form.keepExtensions = true;
  
          form.parse(req, async (err, fields, files) => {
            if (err) {
              console.error("Error parsing form data:", err);
              return res.status(500).json({ message: "Error parsing form data" });
            }
  
            try {
              let data = validateInput(fields);
              if (!data.projectType) {
                data.projectType = "Featured Projects";
              }
  
              // Process Images if provided using Cloudinary
              let processedImages = [];
              if (files.images) {
                const imagesArray = Array.isArray(files.images) ? files.images : [files.images];
                for (const file of imagesArray) {
                  const result = await cloudinary.uploader.upload(file.filepath, {
                    folder: "properties/images",
                    transformation: { width: 800, quality: "auto" },
                  });
                  processedImages.push(result.secure_url);
                }
                data.images = processedImages;
              }
  
              // Process Videos if provided using Cloudinary
              let processedVideos = [];
              if (files.videos) {
                const videosArray = Array.isArray(files.videos) ? files.videos : [files.videos];
                for (const file of videosArray) {
                  const result = await cloudinary.uploader.upload(file.filepath, {
                    folder: "properties/videos",
                    resource_type: "video",
                  });
                  processedVideos.push(result.secure_url);
                }
                data.videos = processedVideos;
              }
  
              const updatedProperty = await PropertyListing.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
              });
  
              if (!updatedProperty) {
                return res.status(404).json({ message: "Property not found" });
              }
  
              return res
                .status(200)
                .json({ message: "Property updated successfully", property: updatedProperty });
            } catch (error) {
              console.error("Error processing PUT:", error);
              return res.status(400).json({
                message: "Validation failed",
                error: error.message,
              });
            }
          });
          break;
        }
  
        case "DELETE": {
          const { id } = req.query;
          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid property ID" });
          }
  
          const deletedProperty = await PropertyListing.findByIdAndDelete(id);
          if (!deletedProperty) {
            return res.status(404).json({ message: "Property not found" });
          }
  
          return res.status(200).json({ message: "Property deleted successfully" });
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
  