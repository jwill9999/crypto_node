//node_modules

const crypto = require('crypto');
require('../.env');


function encryptMyBuffer(buffer, done) {

  console.log(buffer);

  var cipher = crypto.createCipher(process.env.ALGORITHM, process.env.SECURITY_KEY_BUFFER);
  var crypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

  console.log('This is the encrypted buffer ' + crypted);

  return done(null,crypted);
}

function decryptMyBuffer(buffer) {

  var decipher = crypto.createDecipher(process.env.ALGORITHM, process.env.SECURITY_KEY_BUFFER);
  var decrypted = Buffer.concat([decipher.update(buffer), decipher.final()]);


  return decrypted;
}




module.exports.encryptMyBuffer = encryptMyBuffer;
module.exports.decryptMyBuffer = decryptMyBuffer;