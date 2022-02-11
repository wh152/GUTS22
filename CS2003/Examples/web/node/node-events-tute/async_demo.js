/*
 * JavaScript demo code, CS2003
 * Saleem Bhatti, October 2018
 */

"use strict";

// Used to simulate random processing time
function randomTime(min, max) { // min amd max in seconds
  if (max <= min) { return 0; }
  let m = max - min;
  let r = (Math.floor(Math.random() * m) + min) * 1000; // milliseconds
  return r;
}

let G_m = "";

setTimeout(() =>
  { G_m += " A"; console.log(G_m); },
  randomTime(1,3)
);

setTimeout(() =>
  { G_m += " B"; console.log(G_m); },
  randomTime(1,3)
);

setTimeout(() =>
  { G_m += " C"; console.log(G_m); },
  randomTime(1,3)
);

setTimeout(() =>
  { G_m += " D"; console.log(G_m); },
  randomTime(1,3)
);
