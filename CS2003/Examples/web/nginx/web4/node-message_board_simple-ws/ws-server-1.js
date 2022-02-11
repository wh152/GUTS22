/*

 simple message server using WebSockets
 Saleem Bhatti, October 2018

 */

// https://nodejs.org/docs/latest-v8.x/api/fs.html
let fs = require("fs");
// https://nodejs.org/docs/latest-v8.x/api/http.html
let http = require("http");
// https://nodejs.org/docs/latest-v8.x/api/os.html
let os = require("os");
// https://nodejs.org/docs/latest-v8.x/api/process.html
let process = require("process");
// https://www.npmjs.com/package/ws
let ws = require("ws"); // npm install ws

let G_port = process.getuid(); /** type "id" on Linux for uid value **/
if (G_port < 1024) G_port += 10000; // do not use privileged ports

function serveApp(request, response) {
  fs.readFile(__dirname + "/index.html",
  function (error, data) {
    if (error) {
      response.writeHead(500);
      response.end("Error loading index.html");
    }
    else {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.end(data);
    }
  });
}

let httpServer = http.createServer(serveApp).listen(G_port, os.hostname());
let wsServer = new ws.Server({server: httpServer});
let wsList = []; // all connected clients

wsServer.on("connection", function(ws) {

  wsList.push(ws);

  console.log("-- connection: " + wsList.length);

  ws.on("close", function(code, message) {
    let i = wsList.indexOf(this);
    wsList[i] = null;
    for(let n = i; n < wsList.length; ++n) {
      // close hole in array
      wsList[n] = wsList[n + 1];
    }
    --wsList.length;
    console.log("-- disconnected: " + (i + 1));
  });

  ws.on("message", function(data) {
    let message = data.toString();
    console.log("-- client: " + message);
    for(let i = 0; i < wsList.length; ++i) {
      if (wsList[i] != this) { wsList[i].send(message); }
    }
  });

});

console.log("-- server is running: " + os.hostname() + ":" + G_port);
