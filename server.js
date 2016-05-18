// var message = '*************** test ***************\n'
// console.log(message);
// var hello = require('./node_modules/hello.js');
// hello.sayHello();
// message = '\n script called hello.js contain: \n';
// console.log(message);
// fs = require('fs');
// fs.readFile('./node_modules/hello.js', 'utf8', function (err, data) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(data);
// });
// message = '*************** test ***************\n'
// console.log(message);
// ****************************************************************************

var express = require('express');
var app = express();

// server
var http = require('http');
http.createServer(function(req, res){
  res.writeHead(200,{
    'Content-Type': 'text/plain'
  });
  res.end('Hello, world!');
}).listen(8000);
console.log('Server running at http://localhost:8000/');
