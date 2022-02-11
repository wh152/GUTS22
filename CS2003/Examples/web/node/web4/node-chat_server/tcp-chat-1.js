/* simple all-in-one TCP chat application */
/* Saleem Bhatti, October 2018 */
/* Text-based interface is messy. */

/**

When running, type:

  *c hostname port

to connect to a remote host on port, or type:

  *q

to quit the current connection.

**/

// https://nodejs.org/docs/latest-v8.x/api/dns.html
let dns = require("dns");
// https://nodejs.org/docs/latest-v8.x/api/net.html
let net = require("net");
// https://nodejs.org/docs/latest-v8.x/api/os.html
let os = require("os");
// https://nodejs.org/docs/latest-v8.x/api/process.html
let process = require("process");
// https://nodejs.org/docs/latest-v8.x/api/readline.html
let readline = require("readline");

let myPort = process.getuid();
if (myPort < 1024) { myPort += 10000; } // do not use reserved ports
let me = process.env["LOGNAME"]; // works for sh/bash

let G_control = "control";
let G_connect = "*c";
let G_quit = "*q";

let G_data = "data";
let G_user = "user";

function createMessage(type, value) {
  let m = new Object();
  m[type] = value;
  m[G_user] = me;
  return m;
}

let G_remoteHost = { // from command line
  "address" : "",
  "port" : 0,
  "client" : null
};

function clearRemoteHost() {
  G_remoteHost.address = "";
  G_remoteHost.port = 0;
  G_remoteHost.client = null;
}


/*
 * Client part
 */
function clientHandler() {
  let remote = this.remoteAddress + ":" + this.remotePort;
  console.log("-- Connected to " + remote);
}

function setUpClient(client) {

  client.on("data", function(line) {
    let from = "-- " + client.remoteAddress + ":" + client.remotePort;
    let m = JSON.parse(line);

    if (m.hasOwnProperty(G_control)) {

      switch (m[G_control]) {

      case G_quit:
        G_remoteHost.client.destroy();
        clearRemoteHost();
        console.log("-- Disconnected.");
        break;

      default:
        console.log("-- unknown command: " + m[G_control]);
      }
    }

    if (m.hasOwnProperty(G_data)) {
      console.log("--> rx (" + m["user"] + ") " + m["data"]);
    }
  });

  client.on("end", function() {
    console.log("-- Disconnected.");
    clearRemoteHost();
  });
}

/*
 * Very crude user input handling
 */
function handleUserInput(line) {

  let args = line.split(" "); // [0] is a command, rest are args

  switch (args[0]) {

    case G_connect:
    if (G_remoteHost.client) {
      console.log("-- Already connected: type '" + G_quit + "' to quit the connection.");
    }

    else {

      if (args.length != 3) {
        console.log("*c hostname port");
      }

      else {
        G_remoteHost.client =
        net.connect(args[2], args[1], clientHandler).on("error",
            function(e) { console.log(e); G_remoteHost.client = null; });
        if (G_remoteHost.client != null) {
          setUpClient(G_remoteHost.client);
          G_remoteHost.address = this.remoteAddress;
          G_remoteHost.port = this.remotePort;
        }
      }
    }
    break; /* "*c" */

  case G_quit:

    if (G_remoteHost.client) {
      let m = createMessage(G_control, G_quit);
      G_remoteHost.client.write(JSON.stringify(m));
      G_remoteHost.client.destroy();
      clearRemoteHost();
      console.log("-- Disconnected.");
    }
    else {
      console.log("-- Quiting application.");
      process.exit(code=0);
    }

    break; /* "q" */

  default:
    if (G_remoteHost.client) {
      let m = createMessage(G_data, line);
      G_remoteHost.client.write(JSON.stringify(m));
    }
    break;

  } /* switch */

}

let user = readline.createInterface(
{ input: process.stdin, output: process.stdout }
);
user.on("line", handleUserInput);


/*
 *  Server part
 */
let server = net.createServer(function(socket) {

  socket.on("error", function(e) {
      console.log("socket error! " + e);
    });

  G_remoteHost.address = socket.remoteAddress;
  G_remoteHost.port = socket.remotePort;
  G_remoteHost.client = socket;
  setUpClient(G_remoteHost.client);
  let remote = socket.remoteAddress + ":" + socket.remotePort;
  console.log("-- Connected to " + remote);
});

function startup(error, address, family) {
  if (error != null && error.code != 0) {
    console.log("error! " + error);
  }
  else {
    server.listen(myPort, address);
    console.log("-- Server running at "
              + hostname
              + " (" + address + ") :"
              + myPort);
  }
}

let hostname = os.hostname();
dns.lookup(hostname, 4, startup);
