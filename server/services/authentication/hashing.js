const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {

    id:15
};

var token = jwt.sign(data, 'secret123');
console.log(token);

var decoded = jwt.verify(token,'secret123');

console.log(decoded);