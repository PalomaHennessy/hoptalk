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

app.get("/", function(req, res){
	res.render("index.ejs");
});


app.get("/submit", function(req, res){
	res.render("submit.ejs");
});

app.get("/search", function(req, res){
	res.render("search.ejs");
});
app.get("/choices", function(req, res){
	res.render("choices.ejs");
});
app.get("/favorites", function(req, res){
	res.render("favorites.ejs");
});

app.listen(process.env.PORT || 3000, function(){	
	console.log("Much Port Such Sound 3000");
});