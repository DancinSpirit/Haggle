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
        const foundPlayer = await db.Player.findById(id);
        const allRules = await db.Item.find({});
        const context = {info: {player: foundPlayer, items: allRules}};
        res.render("gamemaster/players/items", context);
    } catch (err){
        res.send(err);
    }
})

/* Show Player Rules Screen */
router.get("/players/:id/rules", async function (req, res) {
    try {
        const id = req.params.id;
        const foundPlayer = await db.Player.findById(id);
        const allRules = await db.Rule.find({});
        const context = {info: {player: foundPlayer, rules: allRules}};
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

        console.log(req.body);

        const createdRule = await db.Rule.create(req.body);
        console.log(createdRule);
        res.redirect("/gamemaster/rules");
 
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