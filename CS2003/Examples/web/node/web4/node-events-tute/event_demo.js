/*
 * JavaScript demo code, CS2003
 * Saleem Bhatti, October 2018
 */

"use strict";

// https://nodejs.org/docs/latest-v8.x/api/events.html
const events = require('events');

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// Arrow function - simple function definitions
let zero  = () => { console.log("event - zero"); }
let one   = () => { console.log("event - one"); }
let two   = () => { console.log("event - two"); }
let three = () => { console.log("event - three"); }

// let zero  = function () { console.log("event - zero"); }
// let one   = function () { console.log("event - one"); }
// let two   = function () { console.log("event - two"); }
// let three = function () { console.log("event - three"); }

let countdown = new events.EventEmitter();
countdown.on("zero", zero);
countdown.on("one", one);
countdown.on("two", two);
countdown.on("three", three);

let numbers = ["three", "two", "one", "zero"];
numbers.forEach((n) => {
  countdown.emit(n);
});
