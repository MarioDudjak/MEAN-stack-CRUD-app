var express = require('express'),
  router = express.Router(),
  moment = require('moment'),
  mongoose = require('mongoose'), //mongo connection
  bodyParser = require('body-parser'), //parses information from POST
  methodOverride = require('method-override'); //used to manipulate POST

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

router.route('/')
//GET all blobs
    .get(function(req, res, next) {
    //retrieve all blobs from Monogo
    mongoose.model('User').find({}, function (err, users) {
          if (err) {
              return console.error(err);
          } else {
              //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
              res.format({
                  //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                html: function(){
                    res.render('users/index', {
                          title: 'Lista korisnika',
                          "users" : users
                      });
                },
                //JSON response will show all blobs in JSON format
                json: function(){
                    res.json(users);
                }
            });
          }     
    });
})
.post(function(req, res) {
  console.log("tu sam");
  // Get values from POST request. These can be done through forms or REST calls. These rely on the "naziv_projekta" attributes for forms
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  //call the create function for our database
  mongoose.model('User').create({
      username : username,
      email : email,
      password : password
  }, function (err, user) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        } else {
            //Blob has been created
            console.log('POST creating new user: ' + user);
            res.format({
                //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
              html: function(){
                  // If it worked, set the header so the address bar doesn't still say /adduser
                  res.location("login");
                  // And forward to success page
                  res.redirect("/login");
              },
              //JSON response will show the newly created blob
              json: function(){
                  res.json(user);
              }
          });
        }
  })
});



module.exports = router;
