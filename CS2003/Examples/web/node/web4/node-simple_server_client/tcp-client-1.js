/*
 * Trivial TCP client
 * Saleem Bhatti, Sep 2018
 */
/* from http://nodejs.org/api/net.html, modified */

"use strict";

// https://nodejs.org/docs/latest-v8.x/api/net.html
let net = require("net");
// https://nodejs.org/docs/latest-v8.x/api/process.html
let process = require("process");
// https://nodejs.org/docs/latest-v8.x/api/readline.html
let readline = require("readline");

if (process.argv.length <= 2) {
  console.log("Usage: node tcp-client-1.js <hostname>");
  process.exit(-1);
}

let myServer = process.argv[2];

let myPort = process.getuid(); /** type "id" on Linux for uid value **/
if (myPort < 1024) { myPort += 10000; } // do not use privileged ports
let username = process.env["LOGNAME"]; // works for sh/bash

let remote;
let client = net.connect(myPort, myServer, function()
  {
    remote = this.remoteAddress + ":" + this.remotePort;
    console.log("-- connected to " + remote);
  }
);

client.on("data", function(data) {
  let from = "From " + remote;
  console.log(from + " : " + data.toString());
});

client.on("end", function() {
  console.log("-- disconnected");
});


let user = readline.createInterface(
  { input: process.stdin, output: process.stdout }
);
user.setPrompt=("Please type something: ");
user.on("line", function(data) { client.write(username + " > " + data);});
