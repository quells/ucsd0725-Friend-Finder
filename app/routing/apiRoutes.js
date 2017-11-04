const express = require("express")
const db = require("../data")

var router = express.Router()

router.post("/submit_survey", (req, res) => {
    var newUser = {
        answers: new Array(10)
    }
    for (var key in req.body) {
        var value = req.body[key]
        switch (key) {
            case "userName":
                newUser.name = value
                break;
            case "userImage":
                newUser.image = value
                break;
            default:
                if (key.charAt(0) === "q") {
                    var index = parseInt(key.charAt(1))
                    newUser.answers[index] = parseInt(value)
                }
        }
    }
    var matchResults = db.users.MatchUser(newUser)
    db.users.AddUser(newUser)
    // db.users.SaveUsers() // Don't really need to write new users to disk for this assignment
    res.json(matchResults)
    res.end()
})

module.exports = router
