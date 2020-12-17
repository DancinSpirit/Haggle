const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        items: [{type: mongoose.Schema.Types.ObjectId, ref: "Item"}],
        rules: [{type: mongoose.Schema.Types.ObjectId, ref: "Rule"}]
    },
    {timestamps: true}
)

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;