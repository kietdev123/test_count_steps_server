const express = require("express");
const { count } = require("node:console");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

var count_user = 0;
io.on("connection", (socket) => {
  count_user++;
  console.log(`new user connected: ${count_user}`);

  // Optionally, you can listen for a response from the server
  socket.on("message", (data) => {
    console.log("Received response:", data);
  });
});

app.post("/connect", (req, res) => {
  console.log("Received response:", req.body);
  res.send("Data received");
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
