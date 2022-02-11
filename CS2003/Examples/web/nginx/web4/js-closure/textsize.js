/*
 * Saleem Bhatti, Sep 2018
 * Demonstration of the use of a closure -- text/font size
 */
function changeTextSize() {

  /* Effectively, private variables. */
  let font_size = 14;
  let min_font_size = 10;
  let max_font_size = 50;
  let default_font_size = 14;

  let set = function(f) { /* Effectively, a private function. */
    f = f == 0 ? default_font_size : font_size + f;
    if (f > max_font_size) { f = max_font_size; }
    else if (f < min_font_size) { f = min_font_size; }
    font_size = f;

    document.body.style.fontSize = font_size + "px";
    document.getElementById("fontsize").innerHTML = font_size;

    return font_size; /* not necessary */
  }

  /*
   * Effectively, a set of functions providing
   * a public "interface", like public methods
   * for a class definition.
   */
  let increase = function() { return set(+1); }
  let decrease = function() { return set(-1); }
  let reset = function() { return set(0); }

  let f_a = {
    "reset" : reset,
    "increase" : increase,
    "decrease" : decrease
  };

  return f_a;
}
