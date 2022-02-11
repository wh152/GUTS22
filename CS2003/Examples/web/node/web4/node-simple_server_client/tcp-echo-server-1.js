/*
 * Trivial TCP echo server, CS2003 demo
 * Saleem Bhatti, Sep 2018
 */

"use strict";

// https://nodejs.org/docs/latest-v8.x/api/dns.html
let dns = require("dns");
// https://nodejs.org/docs/latest-v8.x/api/net.html
let net = require("net");
// https://nodejs.org/docs/latest-v8.x/api/os.html
let os = require("os");
// https://nodejs.org/docs/latest-v8.x/api/process.html
let process = require("process");

// https://nodejs.org/docs/latest-v8.x/api/net.html#net_net_createserver_options_connectionlistener
let server = net.createServer(function(socket) {
  socket.write("** Echo server ready: please type something ...\n");
  console.log("-- Connection from "
              + socket.remoteAddress
              + ":"
              + socket.remotePort);
  socket.pipe(socket); // https://nodejs.org/docs/latest-v8.x/api/stream.html
});

function startup(error, address, family) {
  server.listen(myPort, address);
  console.log(hostname + " (" + address + ") : " + myPort);
}

let myPort = process.getuid(); /** type "id" on Linux for uid value **/
if (myPort < 1024) { myPort += 10000; } // do not use privileged ports
let hostname = os.hostname();
// https://nodejs.org/docs/latest-v8.x/api/dns.html#dns_dns_lookup_hostname_options_callback
dns.lookup(hostname, 4, startup);
