// data.js

const mongoose = require('mongoose');
const connectDB = require('./connection');

// User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// User model
const User = mongoose.model('User', UserSchema);

// Register user
const registerUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    console.log('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error.message);
  }
};

// Login user
const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      console.log('User logged in successfully');
      return user;
    } else {
      console.error('Invalid username or password');
      return null;
    }
  } catch (error) {
    console.error('Error logging in user:', error.message);
    return null;
  }
};

// Export functions
module.exports = {
  registerUser,
  loginUser,
};

export default User;
