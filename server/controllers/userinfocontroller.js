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

router.delete('/delete/:id', (req,res) => {
    const query = {where: {id: req.params.id, userId: req.user.id}}
    UserInfo.destroy(query)
    .then(info => res.status(200).json({
        info: info,
        message: 'User Info Deleted'
    }))
    .catch(err => res.json({
        error: err,
        message: 'oops'
    }))
})

module.exports = router