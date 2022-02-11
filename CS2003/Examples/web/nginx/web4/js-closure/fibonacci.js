/*
 * Saleem Bhatti, Sep 2018
 * Demonstration of the use of a closure -- Fibonacci sequence
 */

function fibonacci() {
  let previous = 0;
  let current = 0;

  let f = function() {
    let i = previous + current;
    if (i == 0) { i = 1; }
    previous = current;
    current = i;
    return current;
  }

  return f;
}

let fibonacci_next = fibonacci();
