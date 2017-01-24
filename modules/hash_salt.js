//node_modules

var crypto = require('crypto');



var genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length); /** return required number of characters */
};




var sha512 = function (password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

function verifysaltHashPassword(password, salt, callback) {
    var verify = sha512(password, salt);
    callback({
        hash: verify.passwordHash
    });

}

function saltHashPassword(userpassword, callback) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = ' + userpassword);
    console.log('Passwordhash = ' + passwordData.passwordHash);
    console.log('\nSalt = ' + passwordData.salt);
    callback({
        hash: passwordData.passwordHash,
        password: userpassword,
        salt: passwordData.salt
    });
}

module.exports.saltHashPassword = saltHashPassword;
module.exports.verifysaltHashPassword = verifysaltHashPassword;