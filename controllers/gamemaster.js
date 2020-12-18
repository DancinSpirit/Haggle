/* External Modules */
const express = require("express");

/* Interal Modules */
const db = require("../models");

/* Instanced Modules */
const router = express.Router();

//base route /gamemaster

router.get("/players", async function (req, res) {
    try {
        const allPlayers = await db.Player.find({});
        res.render("gamemaster/players", {players: allPlayers});
    } catch (err) {
        res.send(err)
    }
})

router.post("/players", async function (req, res){
    try{
        await db.Player.create(req.body);
        const allPlayers = await db.Player.find({});
        return res.render("gamemaster/players", {players: allPlayers});
    } catch(err){
        return res.send(err);
    }
})

module.exports = router;