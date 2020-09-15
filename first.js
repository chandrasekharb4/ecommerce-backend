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



//app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));
app.listen(8086,()=>console.log('connected'));

app.get('/getCategories',(req,res) =>{
	con.query("select * from categories",(err,rows,fields)=>{
		if(!err)
			res.send(rows)
		else
			console.log(err)
	});


});

app.get('/getBanners',(req,res) =>{
	con.query("select image as url from banners",(err,rows,fields)=>{
		if(!err)
			res.send(rows)
		else
			console.log(err)
	});


});

app.get('/getOffers',(req,res) =>{
	con.query("select image as url from offers",(err,rows,fields)=>{
		if(!err)
			res.send(rows)
		else
			console.log(err)
	});


});

app.post('/login', (req, res) => {
  var pwd = md5(req.query.pwd);
  var eml = req.query.email;
  con.query("select * from users where email='"+eml+"' and password='"+pwd+"'",(err,rows,fields) =>{
  	if(rows.length > 0){
  	var token =  jsonwebtoken.sign({ user: rows[0].firstname,email:rows[0].email,id:rows[0].id }, jwtSecret);
  	 res.json({status:1,token:token,id:rows[0].id,uname:rows[0].first_name});

  	}
  	else{
  		res.json({status:0});
  	}
  
  })
 
});

app.post('/getAds',(req,res) =>{
	con.query("select * from ads",(err,rows,fields)=>{
		if(!err){
		var ele = [], gro=[];
		for(i=0;i<rows.length;i++){
			if(rows[i].type==2){
				ele.push(rows[i])
			}
			else{
				gro.push(rows[i])
			}
		}
	res.send({ele: ele, gro: gro});
	}
		else
			console.log(err)
	});


});
app.post('/getProduct',async(req,res) =>{
let [rows,fields]  = await con.query("select * from products where id="+req.query.pid+"");
let [rows1,fields1] = await con.query("select * from favourites where pid="+req.query.pid+" and uid="+req.query.uid+"");
if(rows1.length > 0){
	rows[0].fav=1;
}else{
	rows[0].fav=0;
}
let [rows2,fields2] = await con.query("select * from products where category = "+rows[0].category+" limit 10");

res.send({pro:rows,pros:rows2})
});
app.post('/getProducts',(req,res) =>{
console.log(req.body,req.params,req.query);
	con.query("select pro.*,c.sub_category as brand from products as pro left join sub_categories as c on c.id = pro.sub_category where category="+req.query.type+" limit 10",(err,rows,fields)=>{
		if(!err){
		var pro = [], gro=[],women=[],men=[];
		for(i=0;i<rows.length;i++){
				pro.push(rows[i])
		}
	res.send({pro: pro});
	}
		else
			console.log(err)
	});


});

app.post('/getCatProducts',async (req,res) =>{
console.log(req.body,req.params,req.query);
if(req.query.subCat!=0){
var qry = "select pro.*,c.sub_category as brand from products as pro left join sub_categories as c on c.id = pro.sub_category where category="+req.query.type+" and pro.sub_category="+req.query.subCat+" limit "+req.query.limit+"";
}
else{
var qry = "select pro.*,c.sub_category as brand from products as pro left join sub_categories as c on c.id = pro.sub_category where category="+req.query.type+" limit "+req.query.limit+"";
}

let [rows,fields] = await con.query(qry);
for(let i=0;i<rows.length;i++){
	let[rows1,fields1] = 	 await con.query("SELECT * FROM `favourites` WHERE uid=1 and pid="+rows[i].id);
	if(rows1.length > 0){
	rows[i].fav=1;
	}
	else{
	rows[i].fav=0;
	}
}
res.send({pro: rows,token:jsonwebtoken.sign({ user: 'chandu',name:'chnadu',id:'3333' }, jwtSecret)});
	
	/*con.query(qry,(err,rows,fields)=>{
		if(!err){
		var pro = [], gro=[],women=[],men=[];
		for(let i=0;i<rows.length;i++){
				//rows[i].fav=0;
				if(rows.length-1==i){
					con.query("SELECT * FROM `favourites` WHERE uid=1",(err1,rows1,fields1)=>{
					if(!err1){
					if(rows1.length > 0){
						rows[i].fav = '1';
					}
					else{
						rows[i].fav = '0';
					}

					}
					});
					pro.push(rows[i])
				}
				
				res.send({pro: pro,token:jsonwebtoken.sign({ user: 'chandu',name:'chnadu',id:'3333' }, jwtSecret)});
				
		}
	
	}
		else
			console.log(err)
	});*/


});

app.get('/getPros',async (req,res) =>{
const [rows,fields] = await con.query("SELECT * FROM `sub_categories` WHERE `category_id`=1");
	
	console.log("rows: "+rows);
	res.send({data: rows})
})

app.post('/getSubCats',(req,res) =>{
console.log(req.body,req.params,req.query);
	con.query("SELECT * FROM `sub_categories` WHERE `category_id`="+req.query.cat_id,(err,rows,fields)=>{
		if(!err){
		var pro = [], gro=[],women=[],men=[];
		for(i=0;i<rows.length;i++){
				pro.push(rows[i])
		}
	res.send({pro: pro});
	}
		else
			console.log(err)
	});


});
