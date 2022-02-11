/*
 * Opening a csv file to read.
 */

const class_file_name = "cs2003_class.txt";

const fs = require('fs') 

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
	let users = []

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
	
	console.log(users)
}

// Main program

checkAndProcessIfOK( class_file_name )
	
	
	
