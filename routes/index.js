//core node_modules
const express = require('express');
const router = express.Router();
const fs = require('fs');

//created modules

const saltHashPassword = require('../modules/hash_salt').saltHashPassword;
const Login = require('../modules/login_class').Login;
const auth = require('../modules/authorisation');

//variables
var psw;
var salt;
var hash;
var email;


router.get('/', function (req, res) {

  res.redirect('/signin');

});


router.post('/signup', function (req, res) {
  
  email = req.body.email;
  var password = req.body.password;

  saltHashPassword(password, function (data) {
    console.log(data.hash);

    psw = data.password;
    salt = data.salt;
    hash = data.hash;

    var login = new Login(email, salt, hash);

    fs.readFile('files/logins/stored.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        return;
      }

      console.log(data);

      data = JSON.parse(data);
      data.logins.push(login);
      fs.writeFile('files/logins/stored.json', JSON.stringify(data));
      res.redirect('/signup');

    });
  });

});



router.get('/signup', function (req, res) {

  res.render('signup', {
    psw: psw,
    salt: salt,
    hash: hash,
    email: email
  });

});



router.get('/signin', function (req, res) {
  res.render('signin');
});



router.post('/signin', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  auth.authorizeUser(email, password, function (data) {
    if (data.true) {
      res.redirect('/users/text');
    }
    
    res.render('signin');
  });
});











module.exports = router;