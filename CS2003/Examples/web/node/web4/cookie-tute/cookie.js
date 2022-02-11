
/*
 * Cookie demo for CS2003
 * Saleem Bhatti, Sep 2018
*/
// https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent

function getCookieValue(offset) {
  let endstr = document.cookie.indexOf(";", offset);
  if (endstr == -1) { endstr = document.cookie.length; }
  return decodeURIComponent(document.cookie.substring(offset, endstr));
}

function getCookie(name) {
  let arg = name + "=";
  let i = 0;
  while (i < document.cookie.length) {
    let j = i + arg.length;
    if (document.cookie.substring(i, j) == arg) {
      return getCookieValue(j);
    }
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) { break; }
  }
  return null;
}

// Multiple arguments passed to a JavaScript function
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
function setCookie(name, value) { // Looks like only two arguments ...
  let argv = setCookie.arguments; // ... but multiple arguments ...
  let argc = setCookie.arguments.length; // can be dealt with!
  let expires = (argc > 2) ? argv[2] : null;
  let path = (argc > 3) ? argv[3] : null;
  let domain = (argc > 4) ? argv[4] : null;
  let secure = (argc > 5) ? argv[5] : false;
  let c = name + "=" + encodeURIComponent(value) +
    ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
    ((path == null) ? "" : ("; path=" + path)) +
    ((domain == null) ? "" : ("; domain=" + domain)) +
    ((secure == true) ? "; secure" : "");
  document.cookie = c;
}
