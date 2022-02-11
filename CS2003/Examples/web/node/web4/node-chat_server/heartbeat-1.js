/* simple UDP heartbeat, CS2003 */
/* Saleem Bhatti, October 2018 */
/* Text-based interface is messy. */

/*
** No wide-area multicast routing in the lab, so will only
** work within a single ethernet subnet. Also ... this is
** UDP, so there could be some loss.
*/

"use strict";

let G_mAddr = "224.0.42.42";
let G_port = 4242;
let G_timer = 5000; // milliseconds

// https://nodejs.org/docs/latest-v8.x/api/dgram.html
let dgram = require("dgram");

let G_user = process.env["LOGNAME"]; // works for sh/bash

/* network handling */
let G_socket = dgram.createSocket("udp4");

G_socket.bind(G_port,
() => {
  G_socket.addMembership(G_mAddr);
  G_socket.setMulticastTTL(4); // local scope
  G_socket.setMulticastLoopback(false); // do not see what we send
});

console.log("-- Heartbeat: "
            + G_mAddr + ":"
            + G_port + " ("
            + G_user + ")");

G_socket.on("message",
(message, remote) => {
  let from = remote.address + ":" + remote.port;
  let s = message.toString();
  let m = JSON.parse(s);
  let d = new Date(m["timestamp"]);
  s = "(" + m["user"] + ") " + d.toString();
  console.log("--> rx " + from + " > " + s);
 });

/*
 * Very simple timeout handling
 */
function createHeartBeat() {
  let m = { "user" : G_user, "timestamp" : Date.now() };
  return m;
}
function sendHeartbeat() {
  let m = createHeartBeat();
  let b = new Buffer(JSON.stringify(m));
  G_socket.send(b, 0, b.length, G_port, G_mAddr);
  console.log("<-- tx > " + b);
}

setInterval(sendHeartbeat, G_timer)
