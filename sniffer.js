var http = require('http');
var sniffer = require('./core.js');
var server = http.createServer(function(req,res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hi!');
});

sniffer.sniffOn(server);
server.listen(3000);