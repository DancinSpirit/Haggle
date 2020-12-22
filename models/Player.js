const { resolveInclude } = require("ejs");
const mongoose = require("mongoose");
const Item = require("./Item");
const Rule = require("./Rule");

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
        /* This uses the base item scoreValue */
        for(let x=0; x<this.items.length; x++){
            const foundItem = await Item.findById(this.items[x].item);
            totalScore += foundItem.pointValue*this.items[x].quantity;
        };

        /* This uses the rule special effects */
        const allRules = await Rule.find({}).populate("ruleActivators");
        const currentPlayer = await Player.findById(this._id).populate("items.item");
        allRules.forEach(rule => {
            /* This checks to make sure that the player has the items that activates the rule.*/
            if(rule.ruleActivators.length!==0){
                let hasAll=true;
                rule.ruleActivators.forEach(ruleActivator => {
                    let hasItem=false;
                    currentPlayer.items.forEach(item => {
                        if(item.item.name===ruleActivator.name){
                            hasItem=true;
                        } 
                    });
                    if(!hasItem){
                        hasAll=false;
                    } 
                });
                /* If the player has the items, then it calculates the points */
                if(hasAll){
                    if(rule.operator==="the players score value has an increase of"){
                        totalScore += rule.pointValue;    
                    }
                    if(rule.operator==="multiply the player's current score by"){
                        totalScore = totalScore*rule.pointValue;
                    }
                }
            }    
        });

        this.points = totalScore;    
        this.save();
    } catch(err){
        console.log(err);
    }
}

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;