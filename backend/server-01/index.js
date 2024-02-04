const http = require("http");

const websocketServer = require("ws");
//server init
const server = http.createServer((req, res) => {
  res.end("I am connected");
});

//add websocket server
const wss = new websocketServer.Server({ server });

wss.on("connection", (websocket) => {
  websocket.send("Welcome to the websocket server!!");

  websocket.on("message", (msg) => {
    saveMessageFromFront(msg.toString() ?? "");
  });
});

const saveMessageFromFront = (msg) => {
  const fs = require("fs");
  fs.appendFile("file.txt", msg.toString() + "\n", (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("File written successfully");
    }
  });
};

server.listen(8000, () => {
  console.log("I am listening");
});
