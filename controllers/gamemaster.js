/* External Modules */
const express = require("express");

/* Interal Modules */
const db = require("../models");

/* Instanced Modules */
const router = express.Router();

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
        const foundPlayer = await db.Player.findById(id).populate("items");
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
        await db.Player.create(req.body);
        const allPlayers = await db.Player.find({});
        return res.render("gamemaster/players", {players: allPlayers});
    } catch(err){
        return res.send(err);
    }
})

/* Add an Item to Player */
router.post("/players/:id/items", async function (req, res){
    try{
        const id = req.params.id;
        const foundItem = await db.Item.findById(req.body.item);
        const foundPlayer = await db.Player.findById(id);
        foundPlayer.items.push(foundItem._id);
        await foundPlayer.save();
        console.log("foundPlayer", foundPlayer);
        return res.redirect(`/gamemaster/players/${id}/items`);
    } catch(err){
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

        const createdItem = await db.Item.create(req.body);
        console.log(createdItem);
        res.redirect("/gamemaster/items");
 
    } catch (err) {
        res.send(err);
    }
 
 })
 //delete
 router.delete("/items/:id", async function (req, res) {
    try {

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

        const deletedRule = await db.Rule.findByIdAndDelete(req.params.id);
        console.log(deletedRule);
        res.redirect("/gamemaster/rules");
 
    } catch (err) {
        res.send(err);
    }
 
 })


module.exports = router;