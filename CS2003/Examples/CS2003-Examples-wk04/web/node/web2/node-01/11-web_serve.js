"use strict"

/*
 * Serves up any file from the current directory
 * Sets the correct mime type of the result
 * Can easily extend this to server files from other directories
 */

const http = require('http')
const fs = require('fs')

// I did not write this - it is from
// https://stackoverflow.com/questions/28822034/simple-node-js-server-that-sends-htmlcss-as-response
// Have a look and see how it works.
// Can you see anything wrong with it?
function getMimeType( request ) {
	let dotoffset = request.url.lastIndexOf('.')
	return dotoffset == -1
                ? 'text/plain'
                : {
                    '.html' : 'text/html',
                    '.ico' : 'image/x-icon',
                    '.jpg' : 'image/jpeg',
                    '.png' : 'image/png',
                    '.gif' : 'image/gif',
                    '.css' : 'text/css',
                    '.js' : 'text/javascript'
                    }[ request.url.substr(dotoffset) ]
}

///////////////////// The Server ///////////////////// 

const server = http.createServer(function (request, response) {
    fs.readFile('./' + request.url, function(err, data) {
        if (!err) {
			const mimetype = getMimeType( request )
            response.setHeader('Content-type' , mimetype)
            response.end(data)
            console.log( request.url, mimetype )
        } else {
            console.log ('file not found: ' + request.url)
            response.writeHead(404, "Not Found")
            response.end()
        }
    });
}
server.listen(10111, '127.0.0.1')
console.log('Server running')



