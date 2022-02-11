/*
 * Trivial HTTP server, CS2003 demo
 * Saleem Bhatti, Sep 2018
 */

"use strict";

// https://nodejs.org/docs/latest-v8.x/api/dns.html
let dns = require("dns");
// https://nodejs.org/docs/latest-v8.x/api/http.html
let http = require("http");
// https://nodejs.org/docs/latest-v8.x/api/os.html
let os = require("os");
// https://nodejs.org/docs/latest-v8.x/api/process.html
let process = require("process");

function reply(request, response) {
  // https://nodejs.org/api/net.html#net_class_net_socket
  console.log("Replying to "
              + request.socket.remoteAddress
              + ":"
              + request.socket.remotePort);

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World!\n");
}

function startup(error, address, family) {
  let server = http.createServer(reply);
  server.listen(myPort, address);
  console.log(hostname + " (" + address + ") : " + myPort);
}

let myPort = process.getuid(); /** type "id" on Linux for uid value **/
if (myPort < 1024) myPort += 10000; // do not use privileged ports
let hostname = os.hostname();
dns.lookup(hostname, 4, startup);
