// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

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
  const {username,password} = req.body;
  const user = await User.findOne(req.body)
  if (user){
    res.status(200).json({
      success:true,
      data:{user},
      message:"user exsistes"
    })
  }else{
    res.status(404).json({
      success:false,
      message:"user dosent exsistes"
    })
  }
});

module.exports = router;
