// backend/models/Question.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswerIndex: { type: Number, required: true },
  marks: { type: Number, default: 1 } // Marks allocated for this question
});

const testSchema = new Schema({
  testName: {type: String, required: true, unique: true},
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

const Question = mongoose.model('Question', questionSchema);
const Test = mongoose.model('Test', testSchema);

module.exports = { Question, Test };

