
import connectDB  from '../../../../middleware/mangoose';
import Blog from  '../../../../models/Blogs';// Mongoose model for blogs

import mongoose from 'mongoose';

// Validate input data for creating or updating a blog
const validateInput = (data) => {
  const { title, description, image } = data;
  if (!title || !description || !image) {
    throw new Error('Missing required fields: title, description, or image');
  }
  return { title, description, image };
};

const handler = async (req, res) => {
  try {
    switch (req.method) {
      case 'GET': {
        // Pagination parameters
        const { page = 1, limit = 10 } = req.query;

        const blogs = await Blog.find({})
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(parseInt(limit));

        const total = await Blog.countDocuments({});
        res.status(200).json({ total, blogs });
        break;
      }

      case 'POST': {
        try {
          const validData = validateInput(req.body);
          const blog = new Blog(validData);
          await blog.validate(); // Validate against schema
          const savedBlog = await blog.save();
          res.status(201).json({ message: 'Blog created successfully', blog: savedBlog });
        } catch (validationError) {
          console.error('Validation Error:', validationError.errors);
          res.status(400).json({
            message: 'Validation failed',
            errors: Object.values(validationError.errors).map((err) => err.message),
          });
        }
        break;
      }

      case 'PUT': {
        const { id } = req.query;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid blog ID' });
        }

        try {
          const updatedData = validateInput(req.body);
          const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
          });

          if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
          }

          res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
        } catch (updateError) {
          res.status(400).json({ message: 'Validation failed', error: updateError.message });
        }
        break;
      }

      case 'DELETE': {
        const { id } = req.query;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid blog ID' });
        }

        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
          return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully' });
        break;
      }

      default:
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export default connectDB(handler);
