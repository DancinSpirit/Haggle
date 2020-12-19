const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../models");

/* Register */
router.get("/register", async function(req, res){
    try{
        const gamemaster = await db.User.find({gamemaster: true});
        let gamemasterExists = false;
        if(gamemaster.length>0){
            gamemasterExists = true;
        }
        res.render("auth/register",{gamemasterExists: gamemasterExists});
    }catch(err){
        console.log(err);
        return res.send(err);
    }
})

router.post("/register", async function(req,res){
    try{
        const foundUser = await db.User.findOne({username: req.body.username});
        if(foundUser) return res.redirect("/login");
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        if(req.body.gamemaster){
            req.body.gamemaster=true;
        }
        else{
            req.body.gamemaster=false;
            const newPlayer = await db.Player.create({name: req.body.username});
            console.log(newPlayer);
            req.body.player=newPlayer._id;
        }
        const newUser = await db.User.create(req.body);
        return res.redirect("/login");
    }catch(err){
        return res.send(err);
    }    
})

router.get("/login", function(req,res){
    res.render("auth/login");
});

router.post("/login", async function(req,res){
    try{
        const foundUser = await db.User.findOne({username: req.body.username});
        if(!foundUser) return res.redirect("/register");
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if(!match) return res.send("Username or Password Invalid");

        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username,
            gamemaster: foundUser.gamemaster
        }
        if(foundUser.gamemaster)
        res.redirect("/gamemaster/players/")
        else
        res.redirect(`/players/${foundUser.player._id}`)
    }catch(err){
        return res.send(err);
    }    
})

module.exports = router;