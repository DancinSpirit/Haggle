/* External Modules */
const express = require("express");

/* Interal Modules */
const db = require("../models");

/* Instanced Modules */
const router = express.Router();


//base route /players

//REST ROUTES

//index - GET - / - presentational - respond with all players

router.get("/", async function (req, res) {
    
   try {
       const allPlayers = await db.Player.find({});

    res.render("players/index", {players: allPlayers});

   } catch (err) {
       res.send(err)
   }

})

//show - GET - /:id - presentational - respond with specific player by id

router.get("/:id", async function (req, res) {
    try {

        const foundPlayer = await db.Player.find(req.params.id);
         res.render("players/show", {player: foundPlayer});
 
    } catch (err) {
        res.send(err);
    }
 
 })

module.exports = router;