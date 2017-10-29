const express = require("express")
const bodyparser = require("body-parser")
const exphbs = require("express-handlebars")

const PORT = process.env.PORT || 8000

var app = express()

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use("/api", require("./app/routing/apiRoutes"))
app.use("/", require("./app/routing/htmlRoutes"))

const url = "http://localhost"
app.listen(PORT, () => console.log(`App listening at ${url}:${PORT}`))
