//node_modules

const crypto = require('crypto');
var fs = require('fs');



//variables

const algorithm = 'aes-256-ctr';
const key = '14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd';




function encryptMyStream(fileIn, fileout, callback) {
  var createReadStream = fs.createReadStream(fileIn);
  var encryptit = crypto.createCipher(algorithm, key);
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
          callback('first stage all done');
        });
      } else {
        console.log(fileIn + ' not found, so not deleting.');
      }
    }); //end of fs.exists  

  }); //end of output.on  

} // end of cryptMyStream 



function decryptMyStream(fileIn, fileout) {
  console.log('decryptMyStream running');

  var createReadStream = fs.createReadStream(fileIn);
  var decryptit = crypto.createDecipher(algorithm, key);
  //var unzipit = zlib.createGunzip();  
  var writestream = fs.createWriteStream(fileout);

  /* 
  OPTIONAL
  add gunzip pipe to file
  createReadStream.pipe(unzipit).pipe(decryptit).pipe(writestream);

*/

  createReadStream.pipe(decryptit).pipe(writestream);


  //delete old file optional include 

  writestream.on('finish', function () {
    console.log('encrypted stream written to disk!');
    fs.exists(fileIn, function (exists) {
      if (exists) {
        console.log(fileIn + ' still exists. Deleting it now ...');
        fs.unlink(fileIn, function () {
          console.log('encrypted file removed Successful');
        });
      } else {
        console.log(fileIn + ' not found, so not deleting.');
      }
    }); //end of fs.exists
  }); //end of output.on
} // end of decryptMyStream








module.exports.encryptMyStream = encryptMyStream;
module.exports.decryptMyStream = decryptMyStream;