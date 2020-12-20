const mongoose = require("mongoose");

const db = require("./models");

db.Player.updateMany({},{$set: {items: []}}, function (error, created) {
    if (error) return console.log(error)

    console.log(created)
    process.exit();

})


/* db.Item.deleteMany({},function (error, created) {
    if (error) return console.log(error)

    console.log(created)
    process.exit();

}) */

/* db.Rule.deleteMany({},function (error, created) {
    if (error) return console.log(error)

    console.log(created)
    process.exit();

}) */


/* db.Item.find({},function (error, created) {
    if (error) return console.log(error)

    console.log(created)
    process.exit();

}) */

  /*  db.Player
  .find({})
  .populate("items.item")
  .exec(function (err, created) {
    if (err) return res.send(err);
    
    console.log("2",created);
    console.log("3",created[0].items);

    process.exit();

  }) */