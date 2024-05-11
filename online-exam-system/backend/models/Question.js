// backend/models/Question.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  subject_Name: {type:String,requried: true}
});

const questionSchema = new Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswerIndex: { type: Number, required: true },
  marks: { type: Number, default: 1 } // Marks allocated for this question
});

const testSchema = new Schema({
  testName: {type: String, required: true, unique: true},
  testTime: {type: Number,required: true},
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  subject: {type: String, required: true }
});

const Question = mongoose.model('Question', questionSchema);
const Test = mongoose.model('Test', testSchema);
const Subject = mongoose.model('Subject',subjectSchema);

module.exports = { Question, Test };

