const express = require('express');
const router = express.Router();
const User = require('../models/User');
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



router.get('/tests/:testid', async (req, res) => {
    try {
        const testid = req.params.testid;
        const questions = await Test.findById(testid).populate('questions');
        console.log(questions);
        
        res.status(200).json(questions);
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


router.post('/result',async(req,res)=>{
    const {testid, studentid,totalScore} = req.body;

    const user = await User.findById(studentid);
    user.tests.push(testid)
    user.score.push(totalScore)
    await user.save();
})
module.exports = router;