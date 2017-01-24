


function Login(email, salt, passwordHash){

  this.email = email;
  this.salt = salt;
  this.passwordHash = passwordHash;
   

}


module.exports.Login = Login;
