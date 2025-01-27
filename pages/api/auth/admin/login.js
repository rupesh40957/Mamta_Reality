import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import connectDB from '../../../../middleware/mangoose'
import Admin from '../../../../models/Admin';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    // Validation rules
    await Promise.all([
      body('email', 'Enter a valid email').isEmail().run(req),
      body('password', 'Password is required').notEmpty().run(req),
    ]);

    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if admin exists
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ success: false, error: 'Invalid credentials' });
      }

      // Compare password
      const passwordCompare = await bcrypt.compare(password, admin.password);
      if (!passwordCompare) {
        return res.status(400).json({ success: false, error: 'Invalid credentials' });
      }

      // Generate JWT
      const payload = {
        admin: {
          id: admin.id,
        },
      };
      const authtoken = jwt.sign(payload, process.env.JWT_SECRETADMIN, { expiresIn: '1h' });

      // Return success response
      return res.json({ success: true, authtoken, adminName: admin.name, adminEmail: admin.email });
    } catch (error) {
      console.error('Error during login:', error.message);
      return res.status(500).send('Internal Server Error');
    }
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export default connectDB(handler);
