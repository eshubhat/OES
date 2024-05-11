// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const {User} = require('../models/User');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const user_data = req.body;
    const newUser = new User(user_data);
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const {email,password} = req.body;
  const user = await User.findOne({email})
  if (user){
    if(user.password === password){
    res.status(200).json({
      role:user.role,
      id:user._id.toString(),
      success:true,
      data:{user},
      message:"user exsistes"
    })
  }
  }else{
    res.status(404).json({
      success:false,
      message:"user dosent exsistes"
    })
  }
});

router.post('/reset-password', async (req, res) => {
  const { email } = req.body;
  console.log(email)
  const user = await User.findOne({ email });

  if (user) {
    // Create a password reset token (you can use a library like crypto to generate a random token)
   ; // Implement this function to generate a random token

    // Update user's resetToken and resetTokenExpiration in the database

    // Send email with password reset link
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '01fe22bca186@kletech.ac.in', // Your Gmail email address
          pass: 'niqb eqdh zumq zamh' // Your Gmail password or application-specific password
        }
      });

      const resetLink = `http://localhost:3000/reset-password/${user._id}`; // Change example.com to your domain

      const mailOptions = {
        from: '01fe22bca186@kletech.ac.in', // Sender address
        to: email, // Receiver address
        subject: 'Password Reset',
        html: `
          <p>Hello,</p>
          <p>You have requested to reset your password. Please click on the link below to reset your password.</p>
          <a href="${resetLink}">Reset Password</a>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        `
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({
        success: true,
        message: 'Password reset email sent successfully.'
      });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while sending the password reset email.'
      });
    }
  } else {
    res.status(500).json({
      success: false,
      message: 'User does not exist.'
    });
  }
});

router.post("/password-reset/:studentid",async (req,res)=>{
  const {studentid} = req.params;
  const {password} = req.body;
  console.log(studentid);
  console.log(password);

  const user = await User.findById(studentid);
  if(user){
    user.password = password;
    user.save();
    return res.status(200).json({message:"Password reset done!"});
  }else{
    return res.status(500).json({message:"password couldn't be reset"})
  }
})

module.exports = router;
