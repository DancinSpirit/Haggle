const { resolveInclude } = require("ejs");
const mongoose = require("mongoose");
const Item = require("./Item");

const playerSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        items: [{item: {type: mongoose.Schema.Types.ObjectId, ref: "Item"}, quantity: {type: Number, min: 0}}],
        rules: [{type: mongoose.Schema.Types.ObjectId, ref: "Rule"}],
        points: {type: Number}
    },
    {timestamps: true}
)

/* This Updates Player Scores - We can use this to potentially come up with more complex rules */
playerSchema.methods.updatePoints = async function updatePoints(){
    let totalScore = 0;
    try{
        for(let x=0; x<this.items.length; x++){
            const foundItem = await Item.findById(this.items[x].item);
            totalScore += foundItem.pointValue*this.items[x].quantity;
        };
        this.points = totalScore;
        this.save();
    } catch(err){
        return err;
    }
}

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;