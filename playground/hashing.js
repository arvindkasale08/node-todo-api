const {sign, verify} = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hashedValue) => {
        console.log(hashedValue);
    });
});

var hashedPwd = '$2a$10$OPtzMXiKPNT9AWNAWp/tYOl2r.v30RrmGXOyKwBvSZehBm5aDj/Oa';

bcrypt.compare('123abc!', hashedPwd, (err, result) => {
    console.log(result);
});
// var data = {id: 10};

// var token = sign(data, '123abc');
// console.log(token);


// var decoded = verify(token, '123abc');
// console.log('Decoded', decoded);

// const {SHA256} = require('crypto-js');

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
// var hash2 = SHA256(message).toString();
// console.log('Message', message);
// console.log('Hash', hash);
// console.log('Hash', hash2);

// var data = {
//     id: 4 
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// //token.data.id = 5
// //token.hash = SHA256(JSON.stringify(data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data)+ 'somesecret').toString();

// if(resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do not trust!');
// }

// console.log(token);