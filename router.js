const express = require("express");
const router = express.Router()
const controller = require("./controllers/commonController")

//Accessing the files without hbs from other location
router.get('/getCategories',controller.getCategories);
router.post('/getSliders',controller.getSliders);
router.post('/getAds',controller.getAds);
router.post('/getProducts',controller.getProducts);
router.post('/getOffers',controller.getOffers);
router.post('/getSubCategories',controller.getSubCategories);
router.post('/getCategoryProducts',controller.getCategoryProducts);
router.post('/login',controller.login);
module.exports = router;
