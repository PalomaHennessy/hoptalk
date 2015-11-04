var express = require("express");
var router = express.Router();
var request = require('request');


router.get("/", function(req, res){
	res.render("submit.ejs")
});
router.get("/products", function(req, res) {
	console.log("efasf",req.body.beerInputName)
	var name = req.query.q;
	console.log("dfsdfd", req.params)
	var url = "http://api.brewerydb.com/v2/search/?q="+name+"&key="+process.env.BEER_DB;
	console.log(url);
	request(url, function(error, response, body){
			if(!error && response.statusCode === 200){
				var data = JSON.parse(body);
				console.log('data', data);

				
			 } res.render("products.ejs", {data: data});	
	})
});
module.exports = router;



