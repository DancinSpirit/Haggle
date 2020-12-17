/* External Modules */
const express = require("express");
const methodOverride = require("method-override");

/* Interal Modules */
const db = require("./models");
const ctrl = require("./controllers");
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

/* Controllers */

app.use("/players", controllers.players);


/* Listener */
app.listen(PORT, function(){
   console.log(`Live at http://localhost:${PORT}/`);
})