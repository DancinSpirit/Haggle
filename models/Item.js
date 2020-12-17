const mongoose = require("mongoose");

const itemScehma = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        pointValue: {type: Number}
    },
    {
        timestamps: true
    }
)

const Item = mongoose.model("Item", userScehma);

module.exports = Item;