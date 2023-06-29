const { io } = require("socket.io-client");
const readline = require("readline");

const terminalLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let PORT;

function main() {
  const socket = io(`ws://localhost:${PORT}`);
  
  terminalLine.on("line", (msg) => {
    socket.emit("send message", msg);
  });

  socket.on("chat message", (msg) => {
    console.log(msg);
  });
}

terminalLine.question("listen port? ", (msg) => {
  PORT = parseInt(msg);
  main();
});
