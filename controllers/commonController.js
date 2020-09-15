var con = require('../db.js'); 
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
var md5 = require('md5');
var bp = require('body-parser');
const jwtSecret = 'thisistokenjwttwjnekotsisiht';

exports.getCategories = (req,res) =>{
var token =  jsonwebtoken.sign({ user:'dsadsadsadsadsa',email:'sdsadsadsadsad',id:'sdsadsadsadsaadsda' }, jwtSecret);
	con.query("select * from categories",(err,rows,fields)=>{
		if(!err)
			res.send({"data":rows})
		else
			console.log(err)
	});
}


exports.getSliders = (req,res) =>{
con.query("select image as url from banners",(err,rows,fields)=>{
		if(!err)
			res.send(rows)
		else
			console.log(err)
	});


}

exports.getAds = (req,res) =>{
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
}

exports.getProducts = (req,res) =>{
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

}

exports.getOffers = (req,res) =>{
	con.query("select image as url from offers",(err,rows,fields)=>{
		if(!err)
			res.send(rows)
		else
			console.log(err)
	});

}

exports.getSubCategories = (req,res) =>{
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
}

exports.getCategoryProducts = async(req,res) =>{

	if(req.query.subCat_id!=0){
var qry = "select pro.*,c.sub_category as brand from products as pro left join sub_categories as c on c.id = pro.sub_category where category="+req.query.cat_id+" and pro.sub_category="+req.query.subCat_id+" limit "+req.query.limit+"";
}
else{
var qry = "select pro.*,c.sub_category as brand from products as pro left join sub_categories as c on c.id = pro.sub_category where category="+req.query.cat_id+" limit "+req.query.limit+"";
}
console.log(qry)
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
res.send({pro: rows});
}

exports.login = (req,res) =>{

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

}
