const info = require('../files/logins/stored.json');
const verifysaltHashPassword = require('./hash_salt').verifysaltHashPassword;
require('../.env');

function checkUser(email, done) {

      var data = info.logins;
      for (var i = 0; i < data.length; i++) {
        if (data[i].email === email) {
          done(null, {
            salt: data[i].salt,
            hash: data[i].passwordHash
          });
          return;
        }
      }
      return done(null, {
        salt: 'undefined',
        hash: 'undefined'
      });

}




function authorizeUser(email, password, done) {
      checkUser(email, function (err, data) {
        if (err) {
          console.log(err);
          return done(err);
        }

        if (data !== 'undefined') {
          var storedSalt = data.salt;
          var storedHash = data.hash;

      verifysaltHashPassword(password, storedSalt, function (err, data) {
            if(err){
              console.log(err);
              return done(err);
            }
            console.log('return data verifysalthash : ' + data);
            if (data.hash === storedHash) {
              return done(null, true);
            }
            return done(null,false);

      }); //verifysaltHashPassword
     } //if (data !== 'undefined')
  }); //checkUser
}//authorizeUser
  


module.exports.authorizeUser = authorizeUser;