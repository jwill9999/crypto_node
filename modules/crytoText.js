// Nodejs encryption with CTR
var crypto = require('crypto');
require('../.env');

function encryptMyText(textString) {
  var cipher = crypto.createCipher(process.env.ALGORITHM, process.env.SECURITY_KEY_TEXT);
  var encrypted = cipher.update(textString, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decryptMyText(encrypted) {
  var decipher = crypto.createDecipher(process.env.ALGORITHM, process.env.SECURITY_KEY_TEXT);
  var decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}




//export for use in other modules
module.exports.encryptMyText = encryptMyText;
module.exports.decryptMyText = decryptMyText;