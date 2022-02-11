
let i1 = 42; // integer
let i2 = 2;

let s1 = "forty-two"; // string
let s2 = "3";

let f1 = 42.424242; /* 64-bit floating point */
let f2 = 3.3333;

let array_1 = [3, i2, "42?", i1];

function value( parm ) {
  if (parm == i1) {
	  return "you have the answer!"
  }  else if( parm == s2 ) {
	  return ( "that is a crowd" )
  } else {
	  return "this value is nothing special"
  }
}

console.log( i1 + " -> " + value(i1) )
console.log( i2 + " -> " + value(i2) )
console.log( "42"  + " -> " + value("42") + " look at the code!" )
console.log(  3  + " -> " + value("3") + " look at the code!" )

// Recall == and ===

let fn = function( x ) {
	return x * x
}

console.log( "3^2" + " -> " + fn(3) )

fn = function( x ) {
	return x * x * x
}

console.log( "3^3" + " -> " + fn(3) )

const fn2 = function( x ) {
	return x + x
}

//fn2 = function( x ) {
//	return x + x + x
//}

// What will happen if these lines are uncommented?

// Passing a function!

applyTwice = function( f, x ) {
	return f(f(x))
}

console.log( "Apply twice  -> " + applyTwice(fn,2) )





