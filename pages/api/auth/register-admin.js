import { body, validationResult } from 'express-validator';
import connectDB from '../../../middleware/mangoose';
import Admin from '../../../models/Admin';
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
import Script from "next/script";


const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Validation rules
    // If there are errors, return Bad request and the errors
      await Promise.all([
        body('name', 'Enter a valid name').notEmpty().run(req),
        body('email', 'Enter a valid email').isEmail().run(req),
        body('password', 'Password is required').notEmpty().run(req),
      ]);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;
      
      // Check if the admin already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      
      // Create a new admin
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);
    let admin = await Admin({
        name: name,
        password: secPass,
        email:email,
      });
      const data = {
        admin: {
          id: admin.id
        }
      }
      await admin.save();
      const authtoken = jwt.sign(data, process.env.JWT_SECRETADMIN);
      
      // const admin = new Admin({ name, email, password:secPass });
      return res.status(200).json({ok:"register sccssfully!",authtoken});
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Internal Server error' });
    }
  } else {
    return res.status(403).json({ error: ' Not Allowed' });
  }
};

export default connectDB(handler);