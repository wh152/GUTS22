var http = require('http');
http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.end('Hello world\n');
}).listen(10111, '127.0.0.1');
console.log('Server running');
