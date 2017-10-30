const path = require("path")
const express = require("express")
var router = express.Router()

router.get("/", (req, res) => {
    res.render("index")
})

const assetsDir = path.join(path.dirname(module.parent.filename), "app", "assets")
router.get("/assets/:type/:filename", (req, res) => {
    var filepath = path.join(assetsDir, req.params.type, req.params.filename)
    res.sendFile(filepath, )
})

module.exports = router
