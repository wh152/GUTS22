
const http = require('http');
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

function user( uid,lastnames,firstnames ) {
	this.uid = uid
	this.lastnames = lastnames
	this.firstnames = firstnames
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

let processFile = function( filename ) {

	let text = fs.readFileSync(filename).toString('utf-8'); // read the file and convert buffer to string
	let lines = text.split("\r\n")

	count = 0;
	for( line of lines ) {
		let columns = line.split( "," )
		let uid = columns[0]
		let lastnames =  columns[1]
		let firstnames = columns[2]
		let next = new user( uid,lastnames,firstnames )
		users.push( next )
		count++
	}
	users.sort( compare_uid );
}

// Set up the users array

checkAndProcessIfOK( class_file_name )

//////////////////// Generate HTML /////////////////////

function generateClassListHTML() {
	strVar = ""
	for( user of users ) {
		strVar += user.uid + " " + user.firstnames + " " + user.lastnames + "<br>"
	}
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



