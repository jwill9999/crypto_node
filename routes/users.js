var express = require('express');
var router = express.Router();
//core node_modules

const encryptMyText = require('../modules/crytoText').encryptMyText;
const decryptMyText = require('../modules/crytoText').decryptMyText;
const encryptMyStream = require('../modules/cryptoStream').encryptMyStream;
const decryptMyStream = require('../modules/cryptoStream').decryptMyStream;
const decryptMyBuffer = require('../modules/cryptoBuffer').decryptMyBuffer;
const encryptMyBuffer = require('../modules/cryptoBuffer').encryptMyBuffer;


//variables


const streamdatain = 'files/stream.txt';
const streamdataout = 'files/stream.enc';

var results,
    data1;


/* GET users listing. */
router.get('/', function (req, res) {
  res.send('respond with a resource');
});

router.get('/text', function (req, res) {

  var data = 'Trial string to encrypt';

  var crypt = encryptMyText(data);
  var txt = crypt;
  var text2 = decryptMyText(crypt);

  res.render('index', {
    data: data,
    crypt: crypt,
    txt: txt,
    text2: text2,
    results: results,
    data1: data1

  });

});



router.post('/test', function (req, res) {
  data1 = req.param('teststring');  
  
  if (typeof (data1) === 'string') {    
    results = encryptMyText(data1);
  } else {

    results = encryptMyText(data1.tostring());
  }

   res.redirect('/users/text');

});





router.get('/streams', function (req, res) {

  encryptMyStream(streamdatain, streamdataout, function (err, message) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(message);    
    decryptMyStream(streamdataout, streamdatain, function(err, done){
      if(err){
        console.log(err);
        return;
      }
      console.log(done);
    });

    res.render('streams');
  });

});



router.get('/buffers', function (req, res) {

  encryptMyBuffer(new Buffer("hello world", "utf8"), function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    var result = decryptMyBuffer(data);
    console.log('This is converted unencrypted : ' + result);

  });
  res.render('buffers');
});



module.exports = router;