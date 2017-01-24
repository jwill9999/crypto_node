const info = require('../files/logins/stored.json');
const verifysaltHashPassword = require('./hash_salt').verifysaltHashPassword;


function checkUser(email, callback) {

  var data = info.logins;
  for (var i = 0; i < data.length; i++) {
    if (data[i].email === email) {
      callback(null, {
        salt: data[i].salt,
        hash: data[i].passwordHash
      });
      return;
    }
  }
  callback(null, {
    salt: 'undefined',
    hash: 'undefined'
  });

}




function authorizeUser(email, password, callback) {
  checkUser(email, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    if (data !== 'undefined') {
      var storedSalt = data.salt;
      var storedHash = data.hash;

      verifysaltHashPassword(password, storedSalt, function (data) {
        if (data.hash === storedHash) {
          callback({
            true: true
          });
        }
        callback({
          false: false
        });


      }); //verifysaltHashPassword
    } //if (data !== 'undefined')

  }); //checkUser
}//authorizeUser
  

















module.exports.authorizeUser = authorizeUser;