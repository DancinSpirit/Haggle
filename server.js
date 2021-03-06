/* External Modules */
const express = require("express");
const methodOverride = require("method-override");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


/* Interal Modules */
const db = require("./models");
const controllers = require("./controllers");

/* Instanced Modules */
const app = express();
require("dotenv").config()
const PORT = process.env.PORT;

/* Configuration */
app.set("view engine", "ejs");

/* Middleware */
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

/* Session */
app.use(session({
    store: new MongoStore({
        url: process.env.MONGODB_URI,
    }),
    secret: "Shhhhh it's secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    }  
}));

/* Store Data in Session */
app.use(function(req,res,next){
    app.locals.user =  req.session.currentUser;
    next();
})

/* Updates Player Scores */
app.use(async function(req,res,next){
    try{
    const allPlayers = await db.Player.find({});
    allPlayers.forEach(player => {
        player.updatePoints();
    });
    next();
    }catch(err){
        res.send(err);
    }
});

/* Check if Not Signed In */
authRequired = function(req,res,next){
    if(req.session.currentUser){
        next();
    } else {
        res.redirect("/login");
    }
}
/* Check if Gamemaster */
gamemasterRequired = function(req,res,next){
    if(req.session.currentUser.gamemaster){
        next();
    } else {
        res.redirect("/login");
    }  
}
/* Check if Not Gamemaster */
playerRequired = function(req,res,next){
    if(!req.session.currentUser.gamemaster){
        next();
    } else {
        res.redirect("/login");
    }  
}

/* Controllers */
app.use("/gamemaster", authRequired, controllers.gamemaster);
app.use("/players", authRequired, playerRequired, controllers.players);

/* Home Route */
app.get("/", function(req, res){
    res.redirect("/login");
})

/* Logout */ //This is here to get around the login check
app.get("/logout", async function(req,res){
    await req.session.destroy();
    res.redirect("/");
});

/* Auth Controller */
app.use("/", controllers.auth);

app.get("*", function(req,res){
    const context = {description:"Page Not Found!", redirect:"/", button: "Home Page"};
    res.render("error",context);
})

/* Listener */
app.listen(PORT, function(){
   console.log(`Live at http://localhost:${PORT}/`);
})