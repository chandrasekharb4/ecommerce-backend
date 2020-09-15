const path1 = require("path")
const express = require("express")
const app = express()

app.get('/',(req,res)=>{
res.sendFile("index.html", {
root: path1.join(__dirname, "../public/")
})

});

app.get('/about',(req,res)=>{
res.sendFile("about.html", {
root: path1.join(__dirname, "../public/")
})

});



app.listen(3801)
