"use strict"

/*
 * Serves up a single file called registration-a.html from the same directory as the server is run
 */

const http = require('http')
const fs = require('fs')

const htmlsource = "registration-a.html"


function handleGet( req, res ) {
	console.log('get: ' + req.url)
	res.writeHead(200, {'Content-Type': 'text/html'})
	fs.readFile( htmlsource, function (err,data) {
	    if (err) {
	      res.writeHead(404);
	      res.end( JSON.stringify(err) )
	      return;
	    }
	    res.writeHead(200)
	    res.end(data);
	})
}

///////////////////// The Server ///////////////////// 

const server = http.createServer(
	function (req, res) {
		if(req.method == "GET"){ 
			handleGet( req, res )
		} else if(req.method == 'POST'){
    		handlePost( req, res )
		}
	}
)
server.listen(10111, '127.0.0.1')
console.log('Server running')



