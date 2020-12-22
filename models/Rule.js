const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema(
    {
        number: {type: Number, required: true, unique: true},
        info: {type: String, required: true},
        isSecret: {type: Boolean},
        originalPlayer: {type: mongoose.Schema.Types.ObjectId, ref: "Player"},
        ruleActivators: [{type: mongoose.Schema.Types.ObjectId, ref: "Item"}],
        operator: {type: String},
        pointValue: {type: Number}
    },
    {timestamps: true}
)

const Rule = mongoose.model("Rule", ruleSchema);

module.exports = Rule;