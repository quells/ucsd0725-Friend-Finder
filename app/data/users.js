const fs = require("fs")
const csv = require("csv")
const path = require("path")

var _users = []
const _csvFileLocation = path.join(__dirname, "users.csv")

function loadUsers(callback) {
    fs.readFile(_csvFileLocation, "utf8", (err, text) => {
        if (err) {
            console.trace(err)
            callback(err)
        } else {
            csv.parse(text, (err, rows) => {
                if (err) {
                    console.trace(err)
                    callback(err)
                } else {
                    _users = new Array(rows.length)
                    for (var i = 0; i < rows.length; i++) {
                        var row = rows[i]
                        _users[i] = {
                            name: row[0],
                            image: row[1],
                            answers: row.slice(2).map(Number)
                        }
                    }
                    callback(null)
                }
            })
        }
    })
}

function saveUsers(callback) {
    var userRows = _users.map(u => [u.name, u.image].concat(u.answers))
    csv.stringify(userRows, (err, csvData) => {
        if (err) {
            console.trace(err)
            callback(err)
        } else {
            fs.writeFile(_csvFileLocation, csvData, (err) => {
                if (err) {
                    console.trace(err)
                    callback(err)
                }
            })
        }
    })
}

function addUser(user) {
    _users.push(user)
}

function matchUser(user) {
    var matchIndex = 0
    var matchValue = 999
    for (var i = 0; i < _users.length; i++) {
        var user_i = _users[i]
        var value_i = 0
        for (var j = 0; j < user.answers.length; j++) {
            value_i += Math.abs(user.answers[j] - user_i.answers[i])
        }
        if (value_i < matchValue) {
            matchIndex = i
            matchValue = value_i
        }
    }
    return {
        closestMatch: _users[matchIndex],
        matchScore: matchValue
    }
}

module.exports = {
    LoadUsers: loadUsers,
    SaveUsers: saveUsers,
    AddUser: addUser,
    MatchUser: matchUser,
}
