// models/property hai 
import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: String, required: true },
    size: { type: String, required: true },
    baths: { type: Number, required: true },
    propertyType: { type: String, required: true },
    amenities: { type: [String], default: [] },
    images: { type: [String], default: [] },
    videos: { type: [String], default: [] },
    description: { type: String, required: true },
    projectType: { type: String, default: "Featured Projects" },
  },
  { timestamps: true }
);

mongoose.models = {};
export default  mongoose.model("properties_listing", PropertySchema);
