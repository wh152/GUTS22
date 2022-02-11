/*
 * Simple Promise example
 */

const https = require('https');

function doStuff( b ) {
  let val = 0
  for( let i = 0; i < 100000000; i++ ) { val = ( b++ * 5 ) && ( b / 4 ) } // some nonsense that will take a while
  return val
}

function createPromise( some_value ) {

  return new Promise( (resolve, reject) =>
					  {
					  	  let result = doStuff( some_value ) 
					      if( some_value == 3 ) {
					  		  resolve( result )
					  	  } else {
					  	  	  reject( result )
					  	  }
					  }
					)
}


createPromise(3).then(function(response) {
  console.log("Success - that worked with 3", response);
}, function(error) {
  console.error("Failed: didn't work with 3", error);
})


createPromise(6).then(function(response) {
  console.log("Success - that worked with 6", response);
  // could write out the response here
  // console.log( response );
}, function(error) {
  console.error("Failed: didn't work with 6", error);
})
