var express = require("express");
var app = express();
var db = require("./models");
var request = require("request");

var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);
app.set("view engine", "ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/static'));


var session = require("express-session");
app.use(session({
	secret: "bagelsbagelsbagels",
	resave:false,
	saveUninitialized:true
}));

app.use(function(req, res, next){
	if (req.session.user){
		db.user.findById(req.session.user).then(function(user){
			if(user){
				req.currentUser = user;
				next();
			} else {
				req.currentUser = false;
				next();
			}
		});
	} else {
		req.currentUser = false;
		next();
	}
});

var flash = require("connect-flash");
app.use(flash());

app.use(function(req, res, next){
	res.locals.currentUser = req.currentUser;
	res.locals.alerts = req.flash();
	next();
});

app.use("/beer", require("./controllers/beer"));
app.use("/", require("./controllers/auth"));
app.use("/search", require("./controllers/search"));

app.get("/", function(req, res){
	res.render("index.ejs");
});


app.get("/submit", function(req, res){
	res.render("submit.ejs");
});

app.get("/favorites", function(req, res){
	db.favorite.findAll({
		where: {userId: req.currentUser.id}
	}).then(function(favorites){
		res.render("favorites.ejs", {data: favorites});
	})
});

// app.delete("/favorites/delete/:id", function(req, res){
// 	var id= req.params.id 
// 	console.log('id', id)
// 	db.favorite.destory({
// 			where: {
// 				id: id
// 			}
// 		}).then(function(){
// 			res.send({'msg':'success'});
// 		}).catch(function(e){
// 			res.send({'msg':'error', 'error':e});
// 		});

// });

app.delete("/favorites/delete/:id", function(req, res){
	var id= req.params.id 
	// console.log('id', id)
	db.favorite.find({
			where: {
				id: id
			}
		}).then(function(data){
			data.destroy();
			res.send({'msg':'success'});
		}).catch(function(e){
			res.send({'msg':'error', 'error':e});
		});
	
});


app.listen(process.env.PORT || 3000, function(){	
	console.log("Much Port Such Sound 3000");
});