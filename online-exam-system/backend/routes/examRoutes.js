// backend/routes/examRoutes.js

const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');
const Question = require('../models/Question');

// POST /api/exams
router.post('/', async (req, res) => {
  try {
    const { title, description, duration, questions } = req.body;

    // Create new exam
    const newExam = new Exam({ title, description, duration });

    // Save questions and associate with the exam
    const savedQuestions = await Question.insertMany(questions);
    newExam.questions = savedQuestions.map(question => question._id);

    await newExam.save();

    res.status(201).json({ message: 'Exam created successfully', exam: newExam });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create exam', error: error.message });
  }
});

// GET /api/exams/:examId
router.get('/:examId', async (req, res) => {
  try {
    const examId = req.params.examId;
    const exam = await Exam.findById(examId).populate('questions');
    res.status(200).json({ exam });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve exam', error: error.message });
  }
});

module.exports = router;
