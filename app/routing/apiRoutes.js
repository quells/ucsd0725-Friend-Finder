const express = require("express")
const db = require("../data")

var router = express.Router()

router.post("/submit_survey", (req, res) => {
    console.log(req.body)
    res.json({hello: "world"})
    res.end()
})

module.exports = router
