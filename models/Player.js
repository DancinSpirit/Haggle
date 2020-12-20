const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        items: [{item: {type: mongoose.Schema.Types.ObjectId, ref: "Item"}, quantity: {type: Number, min: 0}}],
        rules: [{type: mongoose.Schema.Types.ObjectId, ref: "Rule"}]
    },
    {timestamps: true}
)

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;