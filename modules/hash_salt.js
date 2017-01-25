//node_modules

var crypto = require('crypto');
require('../.env');


var genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length); /** return required number of characters */
};




function sha512(password, salt, done) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return done(null, {
        salt: salt,
        passwordHash: value
    });
}

function verifysaltHashPassword(password, salt, done) {
    sha512(password, salt, function (err, verify) {
        if (err) {
            console.log(err);
            return done(err);
        }
        return done(null, {
            hash: verify.passwordHash
        });

    });

}

function saltHashPassword(userpassword, done) {
    var salt = genRandomString(process.env.SALT_LENGTH); /** Gives us salt of length 16 */
    sha512(userpassword, salt, function (err, passwordData) {
        if (err) {
            console.log(err);
            return done(err);
        }
        return done(null, {
            hash: passwordData.passwordHash,
            password: userpassword,
            salt: passwordData.salt
        });

    });


}

module.exports.saltHashPassword = saltHashPassword;
module.exports.verifysaltHashPassword = verifysaltHashPassword;