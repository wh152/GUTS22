/* Saleem Bhatti, Aug 2018 */
"use strict";

for (let i = 1, f = 1; i <= 12; i++, f *= i) {
  document.write("<p>");
  document.write(i + "!  =  " + f);
	document.write("</p>");
}
