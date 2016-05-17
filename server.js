var http = require('http');

var server = http.createServer(function (req, res) {
   res.writeHead(200, { 'Content-Type': 'text/plain' });
   res.write('Hello World!\n');
   res.end();
});

server.listen(8080);

console.log('Server running at http://localhost:8080');
