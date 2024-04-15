// backend/models/Question.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswerIndex: { type: Number, required: true },
  marks: { type: Number, default: 1 } // Marks allocated for this question
});

module.exports = mongoose.model('Question', questionSchema);

