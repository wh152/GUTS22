/*
 * Opening a file to read.
 */

const class_file_name = "cs2003_2019_class.txt";

// Requiring fs module (object) in which readFile function is defined. 
const fs = require('fs') 
  
// Reading data in utf-8 format which is a type of character set. 
// Instead of 'utf-8' it can be other character set also like 'ascii' 	   

		   
var text = fs.readFileSync(class_file_name).toString('utf-8'); // read the file and convert buffer to string
var lines = text.split("\n")

// will write out the object - an array of strings

console.log( lines ) 

// Listing like cat -n - split into lines

let count = 0;
for( line of lines ) {
	console.log(count + "\t" + line )
	count++
}

// Primitive version - Just writes out the file content

fs.readFile(class_file_name,
			'utf-8',
			(err, data) => { if (err) throw err;
    			console.log(data); // this is the content
			}
		   )

	
	
	