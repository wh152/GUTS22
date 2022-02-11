"use strict";

const http = require('http');
const https = require('https');
const fs = require('fs');
const os = require('os');

const class_file_name = "cs2003_class.txt";

let users = []

/////////////////////  ///////////////////// 

let checkAndProcessIfOK = function( filename ) {
	fs.exists( filename, function(exists) {
  		if (exists) {
    		fs.stat(filename, function(err, stats) { 
      		if (stats.isDirectory()) {
        		console.log(filename + ": is a directory");
      	  	} else {
        	  	processFile(filename)
      		}
    	} )
  	} else {
    	console.log(filename + ": no such file");
  	}
	} )
}

function user( uid,lastnames,firstnames, homepage, uri_ok ) {
	this.uid = uid
	this.lastnames = lastnames
	this.firstnames = firstnames
	this.homepage = homepage
	this.uri_ok = uri_ok
}

// A function to sort users on uid

function compare_uid( user_a, user_b ) {
  if ( user_a.uid < user_b.uid ) {
    return -1;
  }
  if ( user_a.uid > user_b.uid ) {
    return 1;
  }
  return 0;
}

async function processFile( filename ) {

	let text = fs.readFileSync(filename).toString('utf-8'); // read the file and convert buffer to string
	let lines = text.split("\r\n")

	let count = 0;
	for( let line of lines ) {
		if( line != "" ) {
			let columns = line.split( "," )
			let uid = columns[0]
			let lastnames =  columns[1]
			let firstnames = columns[2]
			let homepage = "https:\/\/" + uid + ".host.cs.st-andrews.ac.uk\/";
			try {
				let uri_ok = await checkURI( homepage )
				let next = new user( uid,lastnames,firstnames, homepage, uri_ok )
				users.push( next )
				count++
			} catch(e) {
    			console.error( "Error getting new user for " + uid );
  		  	}

		}
	}
	users.sort( compare_uid );
}

// Set up the users array

checkAndProcessIfOK( class_file_name )

//////////////////// HTML generation /////////////////////

// function returns a Promise
function getPromise( uri ) {
	return new Promise((resolve, reject) => {
		https.get(uri, (response) => {
			let chunks_of_data = []

			response.on('data', (fragments) => {
				chunks_of_data.push(fragments)
			})

			response.on('end', () => {
				let response_body = Buffer.concat(chunks_of_data)
				resolve(response_body.toString())
			})

			response.on('error', (error) => {
				console.error( "response error: " + error)
			})
		})
	})
}

// async function which will wait for the HTTP request to be finished
async function checkURI( uri ) {
	try {
		let http_promise = getPromise( uri )
		let response_body = await http_promise
		
		// response_body holds response from server that is passed when Promise is resolved
	  	if( response_body.includes( "<title>403 Forbidden</title>" ) ) {
		 	return false
	  	} else if( response_body.includes( "<title>502 Bad Gateway</title>" ) ) {
		 	return false
	  	}
	}
	catch(error) {
		console.error( "Promise rejected" )   		// Promise rejected
		return false
	}
	return true
}

//-----------------------

function checkURIAsync( uri ) { // not used - asynchronous
	  https.get(uri, (resp) => {
	  let data = ''

	  // A chunk of data has been recieved.
	  resp.on('data', (chunk) => {
	    data += chunk
	  })

	  // The whole response has been received. Print out the result.
	  resp.on('end', () => {
		  console.log(data)
		  if( data.includes( "<title>403 Forbidden</title>" ) ) {
			 return false
		  } else if( data.includes( "<title>502 Bad Gateway</title>" ) ) {
			 return false
		  }
		  
	  })

	}).on("error", (err) => {
		return false
	});
	return true
}

function generateHeader() {
	return '<head><link rel=\"stylesheet\" href=\"https://ozgur.host.cs.st-andrews.ac.uk/cs2003/wk04/csclass.css\"/><title>Class List for CS2003</title></head>'
}

function generateClassListHTML() {
	let strVar = "<csclass>\n"
	strVar +=  "<student>\n"
	strVar +=  "<uid class=\"columnheading\">UID</uid>\n"
	strVar +=  "<surname class=\"columnheading\">Surname</surname>\n"
	strVar +=  "<firstnames class=\"columnheading\">Firstname</firstnames>\n"
	strVar += "</student>\n"
	
	for( user of users ) {
		const uid =  user.uid
		const lastname = user.lastnames 
		const fistname = user.firstnames
		const homepage = user.homepage
		const homepage_status = user.uri_ok ? "true" : "false";
		strVar +=  "<student>\n"
	    strVar +=  "<uid>" + uid + "</uid>\n";
	    strVar +=  "<lastname> " + lastname + "</lastname>\n";
	    strVar +=  "<firstnames>" + fistname + "</firstnames>\n";
		strVar +=  "<homepage status=\"" + homepage_status + "\"> <a href=\"" + homepage + "\">homepage</a> </homepage>\n";
		strVar +=  "</student>\n"
	}
	strVar += "</csclass>\n";
	return strVar
}

function sendReply( res  ) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	var strVar = "<!DOCTYPE html>";
	strVar += "<html>";
	strVar += "Post not supported by this server"
	strVar += "<\/html>";
	return strVar;
	res.end();
}

///////////////////// Request handlers ///////////////////// 

function handlePost( req, res ) {
	console.log('post: ' + req.url);
	req.setEncoding('utf8');
	req.on('data', chunk => {
		console.log('Got a line of post data: ', chunk);
	})
	req.on('end', () => {
	   	console.log('End of Data - sending reply');
   		sendReply( res ); 
	})

}

function handleGet( req, res ) {
	console.log('get: ' + req.url);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write( generateHeader() );
	res.write( generateClassListHTML() );
	res.end();
}

///////////////////// The Server ///////////////////// 

const server = http.createServer(
	function (req, res) {
		if(req.method == "GET"){ 
			handleGet( req, res );
		} else if(req.method == 'POST'){
    		handlePost( req, res );
		}
	}
);
server.listen(10111, '127.0.0.1');
console.log('Server running');



