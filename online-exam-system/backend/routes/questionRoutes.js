// backend/routes/questionRoutes.js

const express = require('express');
const router = express.Router();
const {Question,Test} = require('../models/Question');


// POST /api/questions
// router.post('/', async (req, res) => {
//   try {
//     const { text, options, correctAnswerIndex } = req.body;
//     const newQuestion = new Question({ text, options, correctAnswerIndex });
//     await newQuestion.save();
//     res.status(201).json({ message: 'Question created successfully', question: newQuestion });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create question', error: error.message });
//   }
// });

router.post('/create-test', async (req, res) => {
  try {
    const { testName,testTime,subject } = req.body;
    const search = await Test.findOne({testName}) 
    console.log(search);
    if(search){
      return res.status(200).json({message:"There already exits a test on this name!"})
    }
    // Create a new test document
    const newTest = new Test({ testName,testTime,subject });

    

    // Save the new test to the database
    
    await newTest.save();
      
    

    // Respond with the ID of the created test
    res.status(201).json({ testId: newTest._id });
  } catch (err) {
    console.error(err);
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/enter-question-details', async (req, res) => {
  try {
    
    const { testName,question, choices, correctChoice } = req.body;

    console.log(testName)
    // Find the test document with the provided test ID
    const test = await Test.findOne({testName:testName});

    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }

    // Create a new question document
    const newQuestion = new Question({
      text: question,
      options: choices,
      correctAnswerIndex: correctChoice
    });

    // Save the new question to the database
    await newQuestion.save();

    // Add the question's ID to the test's questions array
    test.questions.push(newQuestion._id);
    await test.save();

    // Respond with success message
    res.status(200).json({ message: 'Question details added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
