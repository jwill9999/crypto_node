//node_modules

const crypto = require('crypto');


//variables

const algorithm = 'aes-256-ctr';
const key = 'mMj6UXSrXbSNCGDw4aQIxXBjqIIaWTVTfUm5n5ztIdUyntR906wsvW5QCjuL';


function encryptMyBuffer(buffer) {

  console.log(buffer);

  var cipher = crypto.createCipher(algorithm, key);
  var crypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

  console.log('This is the encrypted buffer ' + crypted);

  return crypted;
}

function decryptMyBuffer(buffer) {

  var decipher = crypto.createDecipher(algorithm, key);
  var decrypted = Buffer.concat([decipher.update(buffer), decipher.final()]);


  return decrypted;
}




module.exports.encryptMyBuffer = encryptMyBuffer;
module.exports.decryptMyBuffer = decryptMyBuffer;