/*
 * Conditionals
 * Pretty much like Java.
 */


let i1 = 42; // integer
let i2 = 2;

let s1 = "forty-two"; // string
let s2 = "three";

let f1 = 42.424242; /* 64-bit floating point */
let f2 = 3.3333;

let array_1 = [3, i2, "42?", i1];

// Some nested if .. else .. statements

console.log( "-> if ... elseif ... else\n" )

for(k of array_1 ) {
  if (k == i1) {
    console.log( "The answer.\n" )
  }
  else if (k == s2) {
    console.log( "A crowd.\n" )
  } 
  else if (k == "42?") {  // note == not .equals
    console.log( "More than enough.\n" )
  }
  else if (k == 3) {
    console.log( "More than a crowd.\n" )
  }
  else {
    console.log( "What?\n" )
  }
}

// Switch

console.log(  "-> switch\n" )

for(k of array_1 ) {

  switch (k) {
    case i1: {
    	console.log( "The answer.\n" )
   	 	break;
	}
    case s2: {
    	console.log( "A crowd.\n" )
    	break;
	}
    case "42?": {
    	console.log( "More than enough.\n" )
    	break;
	}
    case 3: {
    	console.log( "More than a crowd.\n" )
    	break;
	}
    default: {
   	 	console.log( "What?\n" )
    	break;
	}

  }

}
