const mongoose = require("mongoose");

const db = require("./models");

/* db.Player.remove({},function (error, created) {
    if (error) return console.log(error)

    console.log(created)
    process.exit();

})


db.Item.remove({},function (error, created) {
    if (error) return console.log(error)

    console.log(created)
    process.exit();

})

db.Rule.remove({},function (error, created) {
    if (error) return console.log(error)

    console.log(created)
    process.exit();

}) */


db.Item.find({},function (error, created) {
    if (error) return console.log(error)

    console.log(created)
    process.exit();

})
