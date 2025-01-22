// /pages/api/properties.js
import connectDB from '@/middleware/mangoose';
import PropertyListing from '@/models/Property'; // Assuming PropertyListing is a Mongoose model

const handler = async (req, res) => {
  try {
    switch (req.method) {
      case 'GET': {
        const properties = await PropertyListing.find({});
        res.status(200).json(properties); // Return the fetched properties
        break;
      }

      case 'POST': {
        // Create a new property listing
        const property = new PropertyListing(req.body); // Assuming req.body has all required fields
        const savedProperty = await property.save();
        console.log("propery listing ");
        res.status(201).json({ message: 'Property added successfully', property: savedProperty });
        break;
      }

      case 'PUT': {
        // Update an existing property listing by ID
        const { id } = req.query;
        const updatedData = req.body;
        const updatedProperty = await PropertyListing.findByIdAndUpdate(id, updatedData, {
          new: true, // Return the updated document
          runValidators: true, // Validate data before updating
        });

        if (!updatedProperty) {
          return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json({ message: 'Property updated successfully', property: updatedProperty });
        break;
      }

      case 'DELETE': {
        // Delete a property listing by ID
        const { id } = req.query;
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
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default connectDB(handler);
