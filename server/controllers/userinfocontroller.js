const express = require('express');
const router = express.Router();
const {UserInfo} = require('../models');

router.get('/test', (req,res)=> res.send('user info test'));

router.post('/create', async (req, res) => {
    let {dateOfBirth, age, heightInInches, weightInPounds, goal} = req.body;
    try{
        const newUserInfo = await UserInfo.create({
            dateOfBirth,
            age,
            heightInInches,
            weightInPounds,
            goal,
            userId: req.user.id
        })
        res.status(201).json({
            message: 'User Info Logged',
            UserInfo: newUserInfo
        })
    } catch (error) {
        res.status(500).json({
            error: 'FAIL!'
        })
    }
})

module.exports = router