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

/* Configuration */
const PORT = 4000;
app.set("view engine", "ejs");

/* Middleware */
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

/* Session */
app.use(session({
    store: new MongoStore({
        url: "mongodb://localhost:27017/haggle"
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

/* Check if Signed In */
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

/* Controllers */
app.use("/gamemaster", authRequired, gamemasterRequired, controllers.gamemaster);
app.use("/players", authRequired, controllers.players);
app.use("/", controllers.auth);

/* Home Route */
app.get("/", function(req, res){
    res.redirect("/login");
})

app.get("*", function(req,res){
    const context = {description:"Page Not Found!", redirect:"/", button: "Home Page"};
    res.render("error",context);
})
/* Listener */
app.listen(PORT, function(){
   console.log(`Live at http://localhost:${PORT}/`);
})