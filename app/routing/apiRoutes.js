const express = require("express")
var router = express.Router()

router.post("/submit_survey", (req, res) => {
    console.log(req.body)
    res.json({hello: "world"})
    res.end()
})

module.exports = router
