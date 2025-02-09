// the api/admin/property-listing.js hai 

import connectDB from '../../../middleware/mangoose';
import PropertyListing from  '../../../models/Property'; // Assuming PropertyListing is a Mongoose model
import mongoose from 'mongoose';

const validateInput = (data) => {
  const { name, location, price, size, baths, propertyType, description, amenities, images, videos, projectType } = data;
  if (!name || !location || !price || !size || !baths || !propertyType || !description) {
    throw new Error('Missing required fields: name, location, price, size, baths, propertyType, or description');
  }
  return { name, location, price, size, baths, propertyType, description, amenities, images, videos, projectType };
};

const handler = async (req, res) => {
  try {
    switch (req.method) {
      case 'GET': {
        const { page = 1, limit = 10 } = req.query;
        const properties = await PropertyListing.find({})
          .skip((page - 1) * limit)
          .limit(parseInt(limit));
        const total = await PropertyListing.countDocuments({});
        if(!properties){
          return res.status(404).json({message:"No properties found"});
        }
        res.status(200).json({ total, properties });
        break;

      }

      default:
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
        break;
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export default connectDB(handler);
