/*
 * Using Promises, demo for CS2003
 * Saleem Bhatti, Sep 2013
 *
 * A friendly tutorial is here: https://javascript.info/async
 */
"use strict";

// Used to simulate random processing time
function randomTime(min, max) { // min amd max in seconds
  if (max <= min) { return 0; }
  let n = max - min;
  let r = (Math.floor(Math.random() * n) + min) * 1000; // milliseconds
  return r;
}

let G_m = "";

new Promise((resolve, reject) => {

  setTimeout(() =>
    { G_m += " A"; console.log(G_m); resolve(G_m); },
    randomTime(1,3));

}).then(function(result) {

  return new Promise((resolve, reject) => {
  setTimeout(() =>
    { G_m += " B"; console.log(G_m); resolve(G_m); },
    randomTime(1,3));
  });

}).then(function(result) {

  return new Promise((resolve, reject) => {
  setTimeout(() =>
    { G_m += " C"; console.log(G_m); resolve(G_m); },
    randomTime(1,3));
  });

}).then(function(result) {

  return new Promise((resolve, reject) => {
  setTimeout(() =>
    { G_m += " D"; console.log(G_m); resolve(G_m); },
    randomTime(1,3));
  });

});
