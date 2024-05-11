// backend/models/User.js

const mongoose = require('mongoose');
const {Test} = require('./Question')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'student'], required: true },
  tests: [{ type: Schema.Types.ObjectId, ref: 'Test' }],
  score: [
    {
      test: { type: Schema.Types.ObjectId, ref: 'Test',required: true },
      score: { type: Number, required: true }
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = {User};
