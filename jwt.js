var con = require('./db.js');
var express = require('express');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
var md5 = require('md5');
var cors = require('cors');
var app = express();
app.use(express.urlencoded({
  extended: true
}))
var bp = require('body-parser');

app.use(cors());

app.use(bp.urlencoded({
  extended: true,
  limit: '50mb'
}));

const jwtSecret = 'thisistokenjwttwjnekotsisiht';



app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));


app.listen(8087,()=>console.log('connected'));

app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));

app.post('/addFav',async (req,res) =>{
	
	let [rows,fields] = await con.query("select * from favourites where pid="+req.query.id+" and uid="+req.query.uid+"");
	if(rows.length==0){
	con.query("INSERT INTO `favourites`(`pid`, `uid`) VALUES ("+req.query.id+","+req.query.uid+")",(err,results)=>{
		if(!err){
			res.json({status:1});
		}
		else
		res.json({status:5});
		});
		}
		else{
			con.query("delete from `favourites` where `pid`="+req.query.id+" and `uid`="+req.query.uid+"",(err,results)=>{
		if(!err){
			res.json({status:2});
		}
		else
		res.json({status:4});
		});
		}


});

