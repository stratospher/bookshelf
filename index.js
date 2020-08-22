const port=8000;
const path=require('path');
const bodyParser = require("body-parser");

const express=require('express');
// const db=require('./config/config.js');

const app=express();

// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bookshelf application." });
  });
require("./routes/author.routes.js")(app);
app.listen(port,function(err){
    if(err){
        console.log("Error!!",err);
        return;
    }
    console.log("Express app is running on port!!",port);
});

