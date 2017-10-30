const fs = require("fs")
const path = require("path")
const express = require("express")
var router = express.Router()

var questions = JSON.parse(fs.readFileSync(path.join(path.dirname(module.parent.filename), "app", "data", "questions.json"), "utf8"))

router.get("/survey", (req, res) => {
    res.render("survey", questions)
})

const assetsDir = path.join(path.dirname(module.parent.filename), "app", "assets")
router.get("/assets/:type/:filename", (req, res) => {
    var filepath = path.join(assetsDir, req.params.type, req.params.filename)
    res.sendFile(filepath, )
})

module.exports = router
