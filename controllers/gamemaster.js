/* External Modules */
const express = require("express");

/* Interal Modules */
const db = require("../models");

/* Instanced Modules */
const router = express.Router();


/*==============================FUNCTIONS==============================*/

const tradeProperties = async function tradeProperties(giver, receiver) {
    
     const trader = await db.Player.findById(giver.id);
     console.log("1trader",trader);

     const tradee = await db.Player.findById(receiver.id);
     console.log("1tradee",tradee);

    //trader give items to tradee
    if (giver.itemId !== ""){//if it is trading an item
        console.log("item is not empty");
        console.log(giver.itemId);
        const hasItem = tradee.items.find((item) => {console.log("item",item.item); return item.item.toString() === giver.itemId}) 

        if (hasItem) {//if other player already has some of that item
            console.log("has item");
            //it uses the update query to find the player and which index of the array is the item, than use the place holder "$" to increase quantity there
            const updated = await db.Player.updateOne({ _id: receiver.id, "items.item": giver.itemId}, {$inc: {"items.$.quantity": parseInt(giver.quantity)}});
            console.log("2updated", updated)
        } else {//if other player does not have this item
            console.log("does not have item");
            const updated = await db.Player.findByIdAndUpdate( receiver.id, {$push: {items: {item: giver.itemId, quantity: giver.quantity}}}, {new: true});
            console.log("2updated", updated)
        }
        //removes items from trader
        const isTotal = trader.items.find((item) => { return item.quantity === parseInt(giver.quantity)});
        if(isTotal) {//if they are trading all of their items
            const deleted = await db.Player.findByIdAndUpdate( giver.id, {$pull: {items: {item: giver.itemId}}}, {new: true});
            console.log("3deleted",deleted);
        } else {//if they are trading just some
            await db.Player.updateOne({ _id: giver.id, "items.item": giver.itemId}, {$inc: {"items.$.quantity": -parseInt(giver.quantity)}});
            console.log("3deleted");
        }
    }
    //trader gives rules to tradee
    if(giver.ruleId !== ""){

        const updated = await db.Player.findByIdAndUpdate( receiver.id, {$push: {rules: giver.ruleId}}, {new: true});
        console.log("4updated", updated);

        //removes rules from trader
        // const deleted = await db.Player.findByIdAndUpdate( giver.id, {$pull: {rules: giver.ruleId}}, {new: true});
        // console.log("4deleted", deleted);

    }


}

/*==============================ROUTES==============================*/

//base route /gamemaster

/* Show Gamemaster Player Screen */
router.get("/players", async function (req, res) {
    try {
        const allPlayers = await db.Player.find({});
        res.render("gamemaster/players", {players: allPlayers});
    } catch (err) {
        res.send(err)
    }
})

/* Show Player Item Screen */
router.get("/players/:id/items", async function (req, res) {
    try {
        const id = req.params.id;
        const foundPlayer = await db.Player.findById(id).populate("items.item");
        const allItems = await db.Item.find({});
        const context = {player: foundPlayer, items: allItems};
        res.render("gamemaster/players/items", context);
    } catch (err){
        res.send(err);
    }
})

/* Show Player Rules Screen */
router.get("/players/:id/rules", async function (req, res) {
    try {
        const id = req.params.id;
        const foundPlayer = await db.Player.findById(id).populate("rules");
        const allRules = await db.Rule.find({});
        const context = {player: foundPlayer, rules: allRules};
        res.render("gamemaster/players/rules", context);
    } catch (err){
        res.send(err);
    }
})

/* Create New Player */
router.post("/players", async function (req, res){
    try{
        let playerExists = false;
        const allPlayers = await db.Player.find({});
        allPlayers.forEach(player => {
            if(req.body.name==player.name){
                playerExists = true;
            }    
        });
        if(!playerExists){
            await db.Player.create(req.body);
            return res.redirect("/gamemaster/players")
        }else {
            const context = {description: "You tried to add a player that already exists!", redirect: "/gamemaster/players", button: "Players Page"};
            return res.render("error",context);    
        }
    } catch(err){
        return res.send(err);
    }
})

/* Add an Item to Player */
router.post("/players/:id/items", async function (req, res){
    try{
        const id = req.params.id;
        const foundPlayer = await db.Player.findById(id);

        //checks if player already has item// if yes returns object which is truthy//else it returns undefined
        const hasItem = foundPlayer.items.find((item) => {console.log("item",item.item); return item.item.toString() === req.body.item}) 

        if (hasItem) {
            console.log("has item");
            //it uses the update query to find the player and which index of the array is the item, than use the place holder "$" to increase quantity there
            const updated = await db.Player.updateOne({ _id: id, "items.item": req.body.item}, {$inc: {"items.$.quantity": parseInt(req.body.quantity)}}, {new:true});
            console.log("updated", updated)
            
        } else {
            console.log("does not have item");
            const foundItem = await db.Item.findById(req.body.item);
            foundPlayer.items.push({item: foundItem._id, quantity: req.body.quantity});
            await foundPlayer.save();
        }

        const foundagainPlayer = await db.Player.findById(id);
        console.log("foundPlayer", foundagainPlayer);
        return res.redirect(`/gamemaster/players/${id}/items`);
    } catch(err){
        console.log(err);
        return res.send(err);
    }
})
/* Add a Rule to Player */
router.post("/players/:id/rules", async function (req, res){
    try{
        const id = req.params.id;
        const foundRule = await db.Rule.findById(req.body.rule);
        const foundPlayer = await db.Player.findById(id);
        foundPlayer.rules.push(foundRule._id);
        await foundPlayer.save();
        console.log("foundPlayer", foundPlayer);
        return res.redirect(`/gamemaster/players/${id}/rules`);
    } catch(err){
        return res.send(err);
    }
})

/* ITEMS ROUTE */
//index
router.get("/items", async function (req, res) {
    try {

        const allItems = await db.Item.find({});
        res.render("gamemaster/items_index", {items: allItems});
 
    } catch (err) {
        res.send(err);
    }
 
 })
//create
 router.post("/items", async function (req, res) {
    try {
        let itemExists = false;
        const allItems = await db.Item.find({});
        allItems.forEach(item => {
            if(req.body.name==item.name){
                itemExists = true;
            }    
        });
        if(!itemExists){
            const createdItem = await db.Item.create(req.body);
            res.redirect("/gamemaster/items");
        }else {
            const context = {description: "You tried to add an item with an item name that already exists!", redirect: "/gamemaster/items", button: "Items Page"};
            return res.render("error",context);
        }
 
    } catch (err) {
        res.send(err);
    }
 
 })
 //delete
 router.delete("/items/:id", async function (req, res) {
    try {
        await db.Player.updateMany({},{$pull: {"items": req.params.id}});
        const deletedItem = await db.Item.findByIdAndDelete(req.params.id);
        console.log(deletedItem);
        res.redirect("/gamemaster/items");
 
    } catch (err) {
        res.send(err);
    }
 
 })

 /* RULES ROUTE */
//index
router.get("/rules", async function (req, res) {
    try {

        const allRules = await db.Rule.find({});
         res.render("gamemaster/rules_index", {rules: allRules});
 
    } catch (err) {
        res.send(err);
    }
 
 })

//create
 router.post("/rules", async function (req, res) {
    try {
        if (req.body.isSecret) {
            req.body.isSecret = true;
            
        } else {
            req.body.isSecret = false
            
        }
        let ruleExists = false;
        const allRules = await db.Rule.find({});
        allRules.forEach(rule => {
            if(req.body.number==rule.number){
                ruleExists = true;
            }    
        });
        if(!ruleExists){
            const createdRule = await db.Rule.create(req.body);
            res.redirect("/gamemaster/rules");
        }else {
            const context = {description: "You tried to add a rule with a rule number that already exists!", redirect: "/gamemaster/rules", button: "Rules Page"};
            return res.render("error",context);
        }
        
 
    } catch (err) {
        res.send(err);
    }
 
 })
 //delete
 router.delete("/rules/:id", async function (req, res) {
    try {
        await db.Player.updateMany({},{$pull: {"rules": req.params.id}});
        const deletedRule = await db.Rule.findByIdAndDelete(req.params.id);
        console.log(deletedRule);
        res.redirect("/gamemaster/rules");
    } catch (err) {
        res.send(err);
    }
 
 })


/* TRADE ROUTES */

//index
router.get("/trade", async function (req, res) {
    try {

        const allPlayers = await db.Player.find({}).populate("items.item").populate("rules");
        // console.log(allPlayers);
        // console.log(allPlayers[1].items);
        //const allRules = await db.Rule.find({});
         res.render("gamemaster/trade", {players: allPlayers});
 
    } catch (err) {
        res.send(err);
    }
 
 })

 router.put("/trade", async function (req, res) {
     try {

        const player1 = {

            id: req.body.traderName,
            itemId: req.body.traderItem,
            quantity: req.body.traderQuantity,
            ruleId: req.body.traderRule

        }

        const player2 = {

            id: req.body.tradeeName,
            itemId: req.body.tradeeItem,
            quantity: req.body.tradeeQuantity,
            ruleId: req.body.tradeeRule

        }

        await tradeProperties(player1, player2);

        await tradeProperties(player2, player1);


        res.redirect("/gamemaster/trade")
        //  res.send({"trader":trader, "tradee":tradee});
        //res.status(status).send(trader, tradee);
     } catch (error) {
         console.log(error);
         res.send(error);
     }
     
 })


module.exports = router;