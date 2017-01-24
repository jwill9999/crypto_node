#Crypto module in Node JS

##Crypto module for text string

<h4>Encryption</h4>

Here we look at converting text string to an encrypted string with the use of the crypto module in Nodejs. Here we call the function encryptMyText(textString) and pass in a text string to convert.

```javascript

// node modules required 

  var crypto = require('crypto');
  const fs = require('fs');

  //variables

  const algorithm = 'aes-256-ctr';
  const key = 'mMj6UXSrXbSNCGDw4aQIxXBjqIIaWTVTfUm5n5ztIdUyntR906wsvW5QCjuL';
  
  
  function encryptMyText(textString){

  var cipher = crypto.createCipher(algorithm,key);
  var encrypted = cipher.update(textString,'utf8','hex');
  encrypted += cipher.final('hex');
  return encrypted; 

}


```

```javascript

<h4>function called </h4>
  
            
Variables            
var textString = 'Trial string to encrypt';

            
var result = encryptMyText(textString)


```

```
<h4>Results from function</h4>

            
Unencryption textString :  Trial string to encrypt

            
This is the encrypted string(result) : a4120c584cf3093c1b2123a4d611414022a7a6d28fd151

```

The file is returned encrypted.You can now save it if you so wish.


<h4>Decryption</h4>

Here we look at converting encrypted text string to an unencrypted text string with the use of the crypto module in Nodejs. Here we call the function decryptMyText(encrypted) and pass in an encrypted string to convert.


```javascript

  // node modules required 

  var crypto = require('crypto');
  const fs = require('fs');

  //variables

  const algorithm = 'aes-256-ctr';
  const key = 'mMj6UXSrXbSNCGDw4aQIxXBjqIIaWTVTfUm5n5ztIdUyntR906wsvW5QCjuL';


  function decryptMyText(encrypted){

  var decipher = crypto.createDecipher(algorithm,key);
  var decrypted = decipher.update(encrypted,'hex','utf8');
  decrypted += decipher.final('utf8');           
  return decrypted;

  }


```

```javascript

<h4>function called</h4>  
            
Variables
            
var result = a4120c584cf3093c1b2123a4d611414022a7a6d28fd151            
var encryptedString = result;

      
var unencryptedString = decryptMyText(encryptedString)


```


```

<h4>Results from function</h4>


            
This is the encryptedString : a4120c584cf3093c1b2123a4d611414022a7a6d28fd151

         
            
This is the unencryptedString : Trial string to encrypt

```