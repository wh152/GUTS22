"use strict"

const http = require('http')
const fs = require('fs')

const htmlsource = "registration-a.html"

//////////////////// Receipt generation /////////////////////

function generatePageHeader( title ) {
	let strVar = "";
	strVar += "<head>";
	strVar += "  <meta charset=\"utf-8\">";
//	strVar += "  <link rel=\"stylesheet\" href=\"" + css_file + "\" type=\"text\/css\">";
	strVar += "  <title>" + title + "<\/title>";
	strVar += "<\/head>";
	return strVar;
}

function fixChars( email ) {
	if( email.includes( "%40" ) ) {
		email = email.replace( "%40", "@" )
	}
	return email
}

function  generateItemList( firstnames,lastname, email, role ) {
	let strVar = "";
	strVar += "firstnames = " + ( firstnames == "" ? "MISSING" : firstnames ) + "<br>"
	strVar += "lastname = " + ( lastname  == "" ? "MISSING" : lastname ) + "<br>"
	strVar += "email = " + ( email  == "" ? "MISSING" : fixChars( email ) ) + "<br>"
	strVar += "role = " + ( role   == "" ? "MISSING" : role ) + "<br>"
	return strVar
}


function generateReplyHTML( firstnames, lastname, email, role ) {
	let strVar = ""
	strVar += "<!DOCTYPE html>"
	strVar += "<html>"
	strVar += generatePageHeader( "Thank you for registering" )
	strVar += "<H1>Thank you for registering<\/H1>"
	strVar += generateItemList( firstnames, lastname, email, role )
	strVar += "<\/html>"
	return strVar
}

function generateMissingReplyHTML( firstnames, lastname, email, role ) {
	let strVar = ""
	strVar += "<!DOCTYPE html>"
	strVar += "<html>"
	strVar += generatePageHeader( "Did you miss something?" )
	strVar += "<H1>Did you miss something?<\/H1>"
	strVar += generateItemList( firstnames, lastname, email, role )
	strVar += "<\/html>"
	return strVar
}

function sendReply( res,html  ) {
	res.writeHead(200, {'Content-Type': 'text/html'})
	res.write( html )
	res.end()
}

function anyMissing( firstnames,lastname, email, role ) {
	return firstnames == "" || lastname == "" || email == "" || role == ""
}

function processForm( chunk, res  ) {
	let firstnames = ""
	let lastname = ""
	let email = ""
	let role = ""
	
	let tokens = chunk.split('&');  // splits string of form "firstnames=Al&lastname=Dearle&email=al%40dearle.net&role=Guest" into an array of strings of form "firstnames=Al"
	for (let index = 0; index < tokens.length; index++) {
		let nameValuePair = tokens[index].split('=');  // splits an item like "firstnames=Al" into an array of name value array encoded pairs: [firstnames,al]
		if( nameValuePair[0] == "firstnames" ) {
			firstnames = nameValuePair[1]
		} else if( nameValuePair[0] == "lastname" ) {
			lastname = nameValuePair[1]
		} else if( nameValuePair[0] == "email" ) {
			email = nameValuePair[1]
		} else if( nameValuePair[0] == "role" ) {
			role = nameValuePair[1]
		}
	}
	if( ! anyMissing( firstnames,lastname, email, role ) ) {
		return generateReplyHTML( firstnames,lastname, email, role )
	} else {
		return generateMissingReplyHTML( firstnames,lastname, email, role )
	}

}

///////////////////// Request handlers ///////////////////// 

function handlePost( req, res ) {
	let html = ""
	console.log('post: ' + req.url)
	req.setEncoding('utf8')
	req.on('data', chunk => {
		console.log('Got a line of post data: ', chunk)
		html = processForm( chunk, res )
	})
	req.on('end', () => {
	   	console.log('End of Data - sending reply')
		console.log( "reply = " + html )
   		sendReply( res, html ) 
	})

}
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



