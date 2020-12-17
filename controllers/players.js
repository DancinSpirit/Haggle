/* External Modules */
const express = require("express");

/* Interal Modules */
const db = require("../models");

/* Instanced Modules */
const router = express.Router();


//base route /players

//REST ROUTES

//index - GET - / - presentational - respond with all players

router.get("/", function (req, res) {
   try {
        res.render("players/index");

   } catch (err) {
       res.send(err)
   }

})

//show - GET - /:id - presentational - respond with specific player by id

router.get("/:id", function (req, res) {
    try {
         res.render("players/show");
 
    } catch (err) {
        res.send(err);
    }
 
 })

module.exports = router;