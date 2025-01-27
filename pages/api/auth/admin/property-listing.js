// the api/admin/property-listing.js hai 

import connectDB from '../../../../middleware/mangoose';
import PropertyListing from  '../../../../models/Property'; // Assuming PropertyListing is a Mongoose model
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
        res.status(200).json({ total, properties });
        break;
      }

      case 'POST': {
        try {
          const validData = validateInput(req.body);
          const property = new PropertyListing(validData);
          await property.validate();
          const savedProperty = await property.save();
          res.status(201).json({ message: 'Property added successfully', property: savedProperty });
        } catch (validationError) {
          console.error('Validation Error:', validationError.errors);
          res.status(400).json({
            message: 'Validation failed',
            error: Object.values(validationError.errors).map((err) => err.message),
          });
        }
        break;
      }

      case 'PUT': {
        const { id } = req.query;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid property ID' });
        }

        const updatedData = validateInput(req.body);
        const updatedProperty = await PropertyListing.findByIdAndUpdate(id, updatedData, {
          new: true,
          runValidators: true,
        });

        if (!updatedProperty) {
          return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json({ message: 'Property updated successfully', property: updatedProperty });
        break;
      }

      case 'DELETE': {
        const { id } = req.query;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid property ID' });
        }

        const deletedProperty = await PropertyListing.findByIdAndDelete(id);
        if (!deletedProperty) {
          return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json({ message: 'Property deleted successfully' });
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
