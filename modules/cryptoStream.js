//node_modules

const crypto = require('crypto');
var fs = require('fs');
require('../.env');


//variables







function encryptMyStream(fileIn, fileout, done) {

  var createReadStream = fs.createReadStream(fileIn);
  var encryptit = crypto.createCipher(process.env.ALGORITHM, process.env.SECURITY_KEY_STREAM);
  //var zipit = zlib.createGzip();
  var writestream = fs.createWriteStream(fileout);


  /* 
    OPTIONAL
    add to gzip file
    createReadStream.pipe(encryptit).pipe(zipit).pipe(writestream);
  */

  createReadStream.pipe(encryptit).pipe(writestream);

  //delete old file optional include below  

  writestream.on('finish', function () {
    console.log('Encrypted stream written to disk!');
    fs.exists(fileIn, function (exists) {
      if (exists) {
        console.log(fileIn + ' still exists. Deleting it now ...');
        fs.unlink(fileIn, function () {
          console.log('Unencrypted file removed Successful');
          return done(null, 'first stage all done');
        });
      } else {
        return done(null,' not found, so not deleting.');
      }
    }); //end of fs.exists  
  }); //end of output.on 
} // end of cryptMyStream 



function decryptMyStream(fileIn, fileout, done) {

  var createReadStream = fs.createReadStream(fileIn);
  var decryptit = crypto.createDecipher(process.env.ALGORITHM, process.env.SECURITY_KEY_STREAM);
  //var unzipit = zlib.createGunzip();  
  var writestream = fs.createWriteStream(fileout);

/* 
  OPTIONAL
  add gunzip pipe to file
  createReadStream.pipe(unzipit).pipe(decryptit).pipe(writestream);*/

  createReadStream.pipe(decryptit).pipe(writestream);

//delete old file optional include 

  writestream.on('finish', function () {
    fs.exists(fileIn, function (exists) {
      if (exists) {
        fs.unlink(fileIn, function (err) {
          if (err) {
            console.log(err);
            return done(err);
          }
          return done(null, 'encrypted file removed Successful');
        });
      } else {
        return done(null, 'File not found, so not deleting.');
      }
    }); //end of fs.exists
  }); //end of output.on
} // end of decryptMyStream








module.exports.encryptMyStream = encryptMyStream;
module.exports.decryptMyStream = decryptMyStream;