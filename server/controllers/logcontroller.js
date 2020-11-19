const express = require("express");
const router = express.Router();
const {Log} = require("../models");

router.get("/practice", (req, res) => res.send("we talkin about PRACTICE???"));

router.post("/", async (req, res) => {
    try {
        const {description, definition, result} = req.body;
        
        let newLog = await Log.create({description, definition, result, owner_id: req.user.id});
        res.status(200).json({
            log: newLog,
            message: "Log Created!!!",
            conslog: `${req.user.id}`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to Log"
        })
    }
})

router.get("/", (req, res) => {
    let userID = req.user.id
    Log.findAll({
        where: {owner_id: userID}
    })
    .then(log => res.status(200).json({
        logs: log,
        messsage: "All of my Logs Retrieved",
        // consolelog: `${console.log(userID)}`
    }))
    .catch(err => res.status(500).json({error: err}))
})

router.get("/:id", (req, res) => {
    const userID = req.user.id;
    const logID = req.params.id
    Log.findOne({
        where: {owner_id: userID, id: logID}
    })
    .then(log => res.status(200).json({
        specifiedLog: log,
        message: "Specific Log Retieved"
    }))
    .catch(err => res.status(500).json({
        error: err,
        message: "You are too weak to access these logs",
    }))
})

router.put("/:id", (req,res) => {
    // const userID = req.user.id;
    const query = {where: {id: req.params.id, owner_id: req.user.id}};
    Log.update(req.body, query)
        .then((logUpdated) => {
            Log.findOne(query).then((locatedUpdatedLog) => {
                res.status(200).json({
                    log: locatedUpdatedLog,
                    message: "Log Updated Successful",
                    logChange: logUpdated
                });
            });
        })
        .catch(err => res.status(500).json({err: err}))
})

router.delete("/:id", (req, res) => {
    const query = {where: {id: req.params.id, owner_id: req.user.id}};
    Log.destroy(query)
    .then(log => res.status(200).json({
        log: log,
        message: "Log Successfully Removed"
    }))
    .catch(err => res.json({error: err}))
})

module.exports = router;