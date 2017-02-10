#Crypto module in Node JS

##Crypto module for text string

<h4>Encryption</h4>

Here we look at converting text string to an encrypted string with the use of the crypto module in Nodejs. Here we call the function encryptMyText(textString) and pass in a text string to convert.

```javascript

  //Node modules required

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

######function called
  
            
######Variables  

var textString = 'Trial string to encrypt';

            
var result = encryptMyText(textString)


```

```
######Results from function

            
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

############function called  
            
Variables
            
var result = a4120c584cf3093c1b2123a4d611414022a7a6d28fd151            
var encryptedString = result;

      
var unencryptedString = decryptMyText(encryptedString)


```


```

############Results from function


            
This is the encryptedString : a4120c584cf3093c1b2123a4d611414022a7a6d28fd151

         
            
This is the unencryptedString : Trial string to encrypt

```


##Crypto module for Streams

<h4>Encryption</h4>

Here we look at converting Streams to an encrypted Stream with the use of the crypto module in Nodejs.
Here we call the function encryptMyStream(fileIn, fileout) and pass in a fileIn, fileOut to convert then save. 
This method creates a read stream with the functions first argument passed, fileIn. This
is then piped into encryptIt function. This function converts it into an encrpted stream. We then need to output
this file somewhere. Here we pipe it into creatWriteStream function and pass a fileout. This then writes the data
to a file to be saved.

```javascript
 //node_modules

        const crypto = require('crypto');
        var fs = require('fs');
        var zlib = require('zlib');

        //variables

        const algorithm = 'aes-256-ctr';
        const key = '14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd';



        function <strong>encryptMyStream(fileIn, fileout)</strong> {
          var createReadStream = fs.createReadStream(fileIn);
          var encryptit = crypto.createCipher(algorithm, key);
          var zipit = zlib.createGzip();
          var writestream = fs.createWriteStream(fileout);


        /* 
          OPTIONAL
          add to gzip file
          createReadStream.pipe(encryptit).pipe(zipit).pipe(writestream);

        */
          
          createReadStream.pipe(encryptit).pipe(writestream);

          //delete old file optional include below  

          writestream.on('finish', function () {
            console.log('Encrypted stream written to disk!');
            fs.exists(fileIn, function (exists) {
              if (exists) {
                console.log(fileIn + ' still exists. Deleting it now ...');
                fs.unlink(fileIn, function (done) {
                  console.log('Unencrypted file removed Successful');
                });
              } else {
                console.log(fileIn + ' not found, so not deleting.');
              }
            }); //end of fs.exists
          
          }); //end of output.on  
          
        }; // end of encryptMyStream 

```

```javascript

######function called
  
            
######Variables  

const streamdatain = 'files/stream.txt';
const streamdataout = 'files/stream.enc';

######Function
            
encryptMyStream(streamdatain, streamdataout);


```

```javascript

######Results from function

This take an unencrypted stream = test stream text from file.

encrypted output before gzip = ��|V�/%�X?���F@3�4\�w�

```

Once the file is output we then emit finish. Once emitted this function checks to see if the original unencrypted
file is still there. If it is we call fs.unlink function. This function deletes that file leaving only the encrypted data.

<h4>Decryption</h4>

Here we look at converting encrypted stream to an unencrypted stream with the use of the crypto
module in Nodejs. Here we call the function decryptMyStream(fileIn, fileout) and pass in an encrypted
stream to convert. This method creates a read stream with the functions first argument passed, fileIn. This is
then piped into decryptIt function. This function converts it into an decrypted stream. We then need to output
this file somewhere. Here we pipe it into creatWriteStream function and pass a fileout. This then writes the data
to a file to be saved.

```javascript
Decryption code

  //node_modules

        const crypto = require('crypto');
        var fs = require('fs');
        var zlib = require('zlib');

        //variables

        const algorithm = 'aes-256-ctr';
        const key = '14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd';


        function <strong>decryptMyStream(fileIn, fileout)</strong> {

          var createReadStream = fs.createReadStream(fileIn);
          var decryptit = crypto.createDecipher(algorithm, key);
          var unzipit = zlib.createGunzip();  
          var writestream = fs.createWriteStream(fileout);

          /* 
          OPTIONAL
          add gunzip pipe to file
          createReadStream.pipe(unzipit).pipe(decryptit).pipe(writestream);

        */

          createReadStream.pipe(decryptit).pipe(writestream);


          //delete old file optional include 

          writestream.on('finish', function () {
            console.log('encrypted stream written to disk!');
            fs.exists(fileIn, function (exists) {
              if (exists) {
                console.log(fileIn + ' still exists. Deleting it now ...');
                fs.unlink(fileIn, function (done) {
                  console.log('encrypted file removed Successful');
                });
              } else {
                console.log(fileIn + ' not found, so not deleting.');
              }
            }); //end of fs.exists
          }); //end of output.on
        }; // end of decryptMyStream  


```

```javascript
######function called
  
            
######Variables  

const streamdatain = 'files/stream.txt';
const streamdataout = 'files/stream.enc';

######Function
            
decryptMyStream(streamdataout, streamdatain);


```

```javascript

############Results from function
            
This take an encrypted stream = ��|V�/%�X?���F@3�4\�w�         
            
Unencrypted output before gzip = test stream text from file


```

Once the file is output we then emit finish. Once emitted this function checks to see if the original unencrypted
file is still there. If it is we call fs.unlink function. This function deletes that file leaving only the encrypted
data.