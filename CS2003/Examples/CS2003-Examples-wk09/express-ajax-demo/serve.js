
const express = require("express")

const app = express()

app.get("/", (req, res) => {
	console.log("Received request");
	// res.send("Hello from express!");
	res.sendFile(__dirname + "/main.html")
})

app.get("/client.js", (req, res) => {
	console.log("Received request");
	// res.send("Hello from express!");
	res.sendFile(__dirname + "/client.js")
})

const os = require("os")

app.get("/api/getHostname", (req, res) => {
	res.send(JSON.stringify({ 'hostname': os.hostname() }))
})

app.get("/api/getServerTime", (req, res) => {
	res.send(new Date().toUTCString())
})


const port = process.getuid()
app.listen(port, () => console.log("Listening at port: " + port));
