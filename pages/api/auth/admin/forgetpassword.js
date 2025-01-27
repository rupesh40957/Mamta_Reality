import { body, validationResult } from 'express-validator';
import connectDB from '../../../../middleware/mongoose';
import Admin from '../../../../module/Admin';
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const handler = async (req, res) => {
  
  if (req.method === 'POST') {

    // Validation rules
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(401).json({ error: " Invalid credentials" });
      }

      // Generate and store the reset token
      const resetToken = crypto.randomBytes(20).toString('hex');
      admin.resetToken = resetToken;
      admin.resetTokenExpiry = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
      await admin.save();
      // Construct the reset URL

      const resetUrl = `${process.env.DOMAIN}/admin/admin-reset-password/${resetToken}`;
      // Send password reset email to the admin
      sendEmail(email, resetUrl);
      res.json({ message: 'Reset email sent' });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

function sendEmail(email, resetUrl){
  try {
    
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const REDIRECT_URL = process.env.REDIRECT_URL; // This should match the redirect URI you specified in the Google Developers 
    const OAuth2 = google.auth.OAuth2;

    // Create OAuth2 client
    const oauth2Client = new OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URL // This should match the redirect URI you specified in step 2
    );

    // Generate the access token
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESHTOKEN
    });

    // Get the access token
    const accessToken = oauth2Client.getAccessToken();

    // Create the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      hostname: 'smtp.gmail.com',
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "help@mamta.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken:process.env.REFRESHTOKEN,
        accessToken: accessToken,
      },
    });

    // Set up email options and send the email
    const mailOptions = {
      from: "  <help@mamta.com>",
      to: email,
      subject: "Reset password instructions",
      html: `<!DOCTYPE html>
      <html>
      <head>
      <title>Reset password instructions</title>
      <style>
      /* Global Styles */
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
      }
      
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      
      h2 {
        color: #007bff;
      }
      
      .button {
        display: inline-block;
        background-color:#008CBA ;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
      }
      
      </style>
      </head>
      <body>
      <div class="container">
        <h2>Reset password</h2>
        <p>Click the button below to reset your password.</p>
        <p><a href=${resetUrl} class="button">Reset Password</a></p>
        <p>If you didn’t request this email, you can safely ignore it.</p>
        <p>This code will expire in 10 minutes. If you do not receive this email.</p>
      </div>
      </body>
      </html>
      `
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (erorr) {
    console.log(erorr);
  }

};

export default connectDB(handler);