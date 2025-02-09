
import connectDB  from '../../../middleware/mangoose';
import Blog from  '../../../models/Blogs';// Mongoose model for blogs



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
          if(!blogs){
            return res.status(404).json({message:"No blogs found"});
          }
        res.status(200).json({ total, blogs });

        break;
      }
    }
     

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export default connectDB(handler);
