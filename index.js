const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8082 }); //also change to server name

wss.on("connection", ws => {
    console.log("New client connected keeman"); //shows in server

    ws.on("message", data =>{  //data = client side sent to server
        var stringdata = data.toString()
       
        console.log("client has sent us:  ${stringdata}"); //formatting doesnt work yet

        ws.send(data.toString().toUpperCase()); //send data to browser, replace with confidence 
    });

    ws.on("close", ()=> {
        console.log("CLient has disconnected :(");
    });

});