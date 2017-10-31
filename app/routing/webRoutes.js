const fs = require("fs")
const path = require("path")
const express = require("express")
const db = require("../data")

var router = express.Router()

router.get("/survey", (req, res) => {
    res.render("survey", db.questions)
})

const assetsDir = path.join(path.dirname(module.parent.filename), "app", "assets")
router.get("/assets/:type/:filename", (req, res) => {
    var filepath = path.join(assetsDir, req.params.type, req.params.filename)
    res.sendFile(filepath, )
})

module.exports = router
