// backend/routes/questionRoutes.js

const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// POST /api/questions
router.post('/', async (req, res) => {
  try {
    const { text, options, correctAnswerIndex } = req.body;
    const newQuestion = new Question({ text, options, correctAnswerIndex });
    await newQuestion.save();
    res.status(201).json({ message: 'Question created successfully', question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create question', error: error.message });
  }
});

module.exports = router;
