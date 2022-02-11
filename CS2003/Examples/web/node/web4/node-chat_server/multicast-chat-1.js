/* simple all-in-one UDP multicast chat application */
/* Saleem Bhatti, October 2018 */
/* Text-based interface is messy. */

/**

When running, type:

  *q

to quit the current application.

**/

/*
** No wide-area multicast routing in the lab, so will only
** work within a single ethernet subnet. Also ... this is
** UDP, so there could be some loss.
*/

"use strict";

let G_mAddr  = "224.0.42.42";
let G_port = 4242;

let G_quit = "*q";

// https://nodejs.org/docs/latest-v8.x/api/dgram.html
let dgram = require("dgram");
// https://nodejs.org/docs/latest-v8.x/api/readline.html
let readline = require("readline");

let G_user = process.env["LOGNAME"]; // works for sh/bash


/* network handling */
let G_socket = dgram.createSocket("udp4");

G_socket.bind(G_port,
() => {
  G_socket.addMembership(G_mAddr );
  G_socket.setMulticastTTL(1); // local scope
  G_socket.setMulticastLoopback(false); // do not see what we send
});
console.log("-- Group Chat: " + G_mAddr  + ":" + G_port);

G_socket.on("message",
(message, remote) => {
  let from = remote.address + ":" + remote.port;
  console.log("--> rx " + from + " > ", message.toString());
});


/*
 * Very crude user input handling
 */
function handleUserInput(line) {

  let args = line.split(" ");

  if (args[0] === G_quit) {

      console.log("-- Quiting application.");
      process.exit(0);

  } /* "q" */

  else {
    let b = new Buffer("[" + G_user + "] " + line);
    G_socket.send(b, 0, b.length, G_port, G_mAddr);
  }

}

let user = readline.createInterface(
{ input: process.stdin, output: process.stdout }
);
user.on("line", handleUserInput);
