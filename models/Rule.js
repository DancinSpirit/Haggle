const mongoose = require("mongoose");

const ruleScema = new mongoose.Schema(
    {
        number = {type: Number, required: true, unique: true},
        info = {type: String, required: true},
        isSecret = {type: Boolean},
        originalPlayer = {type: mongoose.Schema.Types.ObjectId, ref: "Player"}
    }
    {timestamps: true}
)

module.exports = Rule;