const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');
const {Question,Test} = require('../models/Question');

// POST /api/exam-attempts/:examId/submit
router.post('/:examId/submit', async (req, res) => {
  try {
    const { answers } = req.body;
    const examId = req.params.examId;

    const exam = await Exam.findById(examId).populate('questions');
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    let totalMarks = 0;
    const result = [];

    for (let i = 0; i < exam.questions.length; i++) {
      const question = exam.questions[i];
      const userAnswerIndex = answers[i];

      if (userAnswerIndex === question.correctAnswerIndex) {
        totalMarks += question.marks;
        result.push({ question: question.text, answer: question.options[userAnswerIndex], correct: true });
      } else {
        result.push({ question: question.text, answer: question.options[userAnswerIndex], correct: false });
      }
    }

    const percentageScore = (totalMarks / (exam.questions.length * exam.questions[0].marks)) * 100;

    res.status(200).json({ result, totalMarks, percentageScore });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit exam', error: error.message });
  }
});

router.get('/availabletests',async(req,res)=>{
  try {
      
      const TotalTests = await Test.find();
      
      res.status(200).json(TotalTests);
  } catch (error) {
      console.log("hello")
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = router;
