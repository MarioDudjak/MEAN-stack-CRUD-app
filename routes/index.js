var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Aplikacija za LV7' });
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/register', function(req, res) {
  res.render('users/new', { title: 'Registrirajte se' });
});


router.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  
  //call the create function for our database
  mongoose.model('User').find({email:email}, function (err, users) {
    if (err) {
        return console.error(err);
    } else {
      res.format({
        //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
      html: function(){
          // If it worked, set the header so the address bar doesn't still say /adduser
          res.location("blobs");
          // And forward to success page
          res.redirect("/blobs");
      },
      //JSON response will show the newly created blob
      json: function(){
          res.json(blob);
      }});
    }
  
});

});

module.exports = router;

