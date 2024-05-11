const express = require('express');
const router = express.Router();
const {User} = require('../models/User');
const {Test} = require('../models/Question');


router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.status(200).json({username:user.username,email:user.email,role:user.role});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/tests', async (req, res) => {
    try {
        const {studentId} = req.body;
        console.log(studentId);
        const user = await User.findById(studentId).populate('score').populate('tests');
        console.log(user);
        
        res.status(200).json({tests:user.tests,score:user.score});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.get('/tests/:testid', async (req, res) => {
    try {
        const testid = req.params.testid;
        const questions = await Test.findById(testid).populate('questions');
        console.log(questions);
        
        res.status(200).json({questions});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/retrievetest/:id',async (req, res) => {
    try {
        const id = req.params.id;
        const attemptedTests = await Test.findById(id).populate('questions');
        console.log(attemptedTests)
        
        res.status(200).json({details:attemptedTests});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.post('/result', async (req, res) => {
    const { testid, studentid, totalScore } = req.body;

    try {
        // Find the user by studentid
        const user = await User.findById(studentid);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Push testid to the tests array
        user.tests.push(testid);
        
        // Push an object containing testid and totalScore to the score array
        user.score.push({ test: testid, score: totalScore });

        // Save the updated user document
        await user.save();

        // Send a success response
        res.status(200).json({ message: 'Result saved successfully' });
    } catch (error) {
        // Handle any errors
        console.error('Error saving result:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/students', async (req, res) => {
    try {
        const user = await User.find({role:"student"});
        console.log(user);
        
        res.status(200).json({user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;