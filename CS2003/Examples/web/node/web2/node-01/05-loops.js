/*
 * Some examples of iteration.
 * continue and break work as you might expect.
 */


let i1 = 42;
let i2 = 3;

let s1 = "forty-two";
let s2 = "three";

let f1 = 42.424242; /* 64-bit floating point */
let f2 = 3.3333;

let array_1 = [42, 3, 42.424242, 3.3333]
let array_2 = [i1, i2, f1, f2] // heterogeneous content (different types)
let array_3 = [s1, 42, s2, 3]
let array_4 = [10, 20, 30, 40 ]
let array_5 = ["a", "b", "c", "d" ]

// For loop

console.log( "array_1" )
for (let i = 0; i < 4; ++i) {  // always use let for for loops!!!
  console.log( "\t" + array_1[i] )
}

// While loop

console.log( "array_2" )
let i = 0;
while (i < 4) {
  console.log( "\t" + array_2[i] )
  i = i + 1;
}

console.log( "array_3" )
let j = 0;

// Do .. while loop

do {
  console.log( "\t" + array_3[j] )
  j = j + 1;
} while (j< 4);

// For in loop

console.log( "array_4" )
for( property in array_4 ) {
  console.log( "\t" + array_4[property] )
}


// For of loop

console.log( "array_5" )
for( value of array_5 ) {
  console.log( "\t" + value)
}

