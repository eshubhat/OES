// backend/models/Exam.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, default: 60 }, // Duration in minutes
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

module.exports = mongoose.model('Exam', examSchema);

