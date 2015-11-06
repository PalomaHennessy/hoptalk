var express = require('express');
var router = express.Router();
var db = require('../models');
// var session = require("express-session");
// var flash = require("connect-flash");
// router.use(flash());

// router.use(function(req, res, next){
//   res.locals.currentUser = req.currentUser;
//   res.locals.alerts = req.flash();
//   next();
// });

        
router.route("/login")
  .get (function(req, res){
    res.render("index.ejs");
  })
  .post(function(req, res){
    db.user.authenticate(
      req.body.email,
      req.body.password,
      function(err, user) {
        if (err) {
          res.send(err);
        } else if (user) {
          req.session.user = user.id;
          req.flash("success", "You are logged in!");
          res.redirect("/favorites");
        } else {
          req.flash("error", "Invalid username or password");
          res.redirect("/");

        }
      }
    );
  });

router.route('/signup') 
  .get(function(req, res){
    res.render("signup.ejs");
      })
    .post(function(req, res){
        if (req.body.password1 !== req.body.password2){
          req.flash("error", "Passwords must match");
          res.redirect("signup.ejs");
        } else {
          db.user.findOrCreate({
            where:{
              email: req.body.email
            },
            defaults: {
              email: req.body.email,
              password: req.body.password1,
              firstName: req.body.first,
              lastName: req.body.last
            }
          }).spread(function(user, created) {
            if (created){
              req.flash('success', 'You are signed up');
              res.redirect('/login');
            } else {
              req.flash("danger", "A user with that email already exists");
              res.redirect("/signup");
            }
          }).catch(function(err){
            req.flash("error", "an error occured");
            res.redirect("/signup");
          });
        }
  });
// router.get("/logout", function(req, res){
//   req.flash("info", "You have been logged out");
//   req.session.user = false;
//   res.redirect("login.ejs");
// });

module.exports = router;