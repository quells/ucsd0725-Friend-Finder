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
app.use("/", require("./app/routing/webRoutes"))
app.use((req, res) => {
    res.render("index")
})

var db = require("./app/data")
db.users.LoadUsers((err) => {
    if (err) {
        console.error(err)
    } else {
        app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
    }
})
