/*
 * Simple Promise example
 */


function sleep(delay) { // sleep for delay milliseconds - busy loop
    var start = new Date().getTime()
    while (new Date().getTime() < start + delay);
}

function doStuff( b ) {
  let val = 0
  for( let i = 0; i < 5; i++ ) { 
      sleep( 1000 )
	  console.log( "Running doStuff() " + b )
	  val = val * i
  }
  return val
}

function createPromise( some_value ) {

  return new Promise( (resolve, reject) =>
					  {
						  console.log( "Running the Promise function for " + some_value )
					  	  let result = doStuff( some_value ) 
					      if( some_value == 3 ) {
							  console.log( "Resolving the value " + some_value )
					  		  resolve( result )
					  	  } else {
							  console.log( "Rejecting the value "  + some_value )
					  	  	  reject( result )
					  	  }
						  console.log( "Promise function for " + some_value + " complete" )
					  }
					)
}


createPromise(3).then(function(response) {
  console.log("Success - that worked with 3", response)
}, function(error) {
  console.error("Failed: didn't work with 3", error)
})


createPromise(6).then(function(response) {
  console.log("Success - that worked with 6", response)
}, function(error) {
  console.error("Failed: didn't work with 6", error)
})

console.log( "done" )