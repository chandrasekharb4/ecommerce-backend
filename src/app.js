var path = require("path");

const express = require('express');

var app = express();
//basic functions for middleware
app.use(express.urlencoded(){extended: false});
app.use(express.json());
app.use(express.static("public"));//express gain access for everything in the public folder
app.set("views","views")
app.set("view engine","hbs")//to handle html files

app.get('/',(req,res)=>{
res.send("My app")

});

app.get('/about',(req,res)=>{

res.send("about")
});

app.listen(3800)
