const express = require("express");
const app = express();
var cors = require('cors');

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static("public"));

//create object for routers
const router = require("./router");
//using router app
app.use("/",router);





app.listen(3600,()=>{
	console.log("Server started @3600")
})