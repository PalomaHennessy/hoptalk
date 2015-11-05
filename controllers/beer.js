var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

var environment = process.env.NODE_ENV || 'development';
//take name of beer from a drop down menu and match with other beers of the same category ID
//need name, abv, ibu, srmId, availabilityId, styleId



//List all favorites on a page
router.get("/favorites", function(req, res){
	db.favorite.findAll().then(function(name){
	res.render("favorites.ejs", {data : name})
	});
	// res.render("favorite.ejs", {data : favorite})
});

//Add a favorite to the list from other page
router.post("/favorites", function(req, res) {
	// console.log("efasf",req.body.beerInputName)
	// var name = req.body.q;
	// var url = "http://api.brewerydb.com/v2/search/?q="+name+"&key="+process.env.BEER_DB;
	// console.log(url);
	// request(
	// 	url,
	// 	function(error, response, body){
	// 		if(!error && response.statusCode === 200){
	// 			var data = JSON.parse(body);
	// 			console.log('data', data);
	console.log("right?")
	console.log('USERID',req.currentUser.id)

	db.favorite.create({
			name: (req.body.name ? req.body.name : null),
			styleId: (req.body.styleId ? req.body.styleId : null), 
			description: (req.body.description ? req.body.description : null), 
			glassware: (req.body.glasswareId ? req.body.glasswareId : null), 
			userId: req.currentUser.id
		}).then(function(favorite){
			db.favorite.findAll({
				where: {userId: req.currentUser.id}
			}).then(function(data){
				res.redirect("/favorites")
			});
		// res.render("products.ejs", {data: favorite})
		});	

});	 

router.delete("/favorites/delete/:id", function(req, res){
	var id= req.params.id 
	console.log('id', id)
	db.favorite.destory ({
			where: {
				id: id
			}
		}).then(function(){
			res.send({'msg':'success'});
		}).catch(function(e){
			res.send({'msg':'error', 'error':e});
		});

});

module.exports = router;

//make model with favorites that is associated with user favorites

