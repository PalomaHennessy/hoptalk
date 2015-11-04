var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

var environment = process.env.NODE_ENV || 'development';
//take name of beer from a drop down menu and match with other beers of the same category ID
//need name, abv, ibu, srmId, availabilityId, styleId


router.post("/submit/name", function(req, res) {
	console.log("efasf",req.body.beerInputName)
	var name = req.body.q;
	var url = "http://api.brewerydb.com/v2/search/?q="+name+"&key="+process.env.BEER_DB;
	console.log(url);
	request(
		url,
		function(error, response, body){
			if(!error && response.statusCode === 200){
				var data = JSON.parse(body);
				console.log('data', data);
	db.favorite.create({
			name:data.data[0].name, 
			styleId:data.data[0].styleId, 
			description:data.data[0].description, 
			glassware:data.data[0].glasswareId, 
			userId:data.data[0].userId
		}).then(function(favorite){
			db.user.findAll(then(function(title){
				res.render("favorites.ejs", {data:title})
				}).catch(function(error){
				res.send("nope")
			}));	
		res.render("favorites.ejs", {data: favorite})
		});	
			} else {
				res.send(body);
			} 
		}
	);

});	 

router.get("/submit", function(req, res){
	db.user.findAll().then(function(name){
	res.render("favorites.ejs", {data: name})
	});
});

router.post("/submit/name", function(req, res){
	console.log("beername")
});		


router.delete("/name", function(req, res){
	db.favorites.destory ({
		where: {
			name: req.params.name
		}
	}).then(function(){
		res.send({'msg':'success'});
	}).catch(function(e){
		res.send({'msg':'error', 'error':e});
	});
});
// })

module.exports = router;

//make model with favorites that is associated with user favorites




// var query = req.params.q;
//  request(searchUrl+"q="+query+"key="+process.env.API_KEY, function(err, response, body){
// var data = JSON.parse(body);