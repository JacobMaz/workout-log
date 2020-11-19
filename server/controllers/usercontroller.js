const router = require("express").Router();
const {User} = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {UniqueConstraintError} = require("sequelize/lib/errors");

router.get("/usertest", (req, res) => res.send("this is a test"));

router.post("/register", async (req, res) => {
    let {username, passwordhash} = req.body;
    try {
        const newUser = await User.create({
            username,
            passwordhash: bcrypt.hashSync(passwordhash, 13)
        })
        res.status(201).json({
            message: "User registered!",
            user: newUser
        })
    } catch (error) {
        if(error instanceof UniqueConstraintError){
            res.status(409).json({
                message: "username already in use."
            })
        } else {
            res.status(500).json({
                error: "Failed to register user."
            })
        }
    }
})

router.post("/login",async (req, res) => {
    let {username, passwordhash} = req.body;
    try {
        let loginUser = await User.findOne({
            where: {username}
        })
        if(loginUser && await bcrypt.compare(passwordhash, loginUser.passwordhash)){
            const token = jwt.sign({id: loginUser.id, username: loginUser.username}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
            res.status(200).json({
                message: "Login Succeeded!",
                user: loginUser,
                token
            })
        } else {
            res.status(401).json({
                message: "Login Failed: Userinformation incorrect."
            })
        }
    } catch (error) {
        res.status(500).json({error: "Error Logging in!"})
    }
})

module.exports = router;