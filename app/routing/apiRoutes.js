const express = require("express")
var router = express.Router()

router.get("/hello", (req, res) => {
    res.json({hello: "world"})
    res.end()
})

module.exports = router
