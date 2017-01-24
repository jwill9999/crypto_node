// Nodejs encryption with CTR
var crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const key = 'mMj6UXSrXbSNCGDw4aQIxXBjqIIaWTVTfUm5n5ztIdUyntR906wsvW5QCjuL';

function encryptMyText(textString) {
  var cipher = crypto.createCipher(algorithm, key);
  var encrypted = cipher.update(textString, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decryptMyText(encrypted) {
  var decipher = crypto.createDecipher(algorithm, key);
  var decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}






//export for use in other modules
module.exports.encryptMyText = encryptMyText;
module.exports.decryptMyText = decryptMyText;