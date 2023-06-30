import { io } from 'socket.io-client';
import * as readline from 'readline';

const terminalLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let PORT;

function main() {
  const socket = io(`ws://localhost:${PORT}/location`);

  terminalLine.on('line', (msg) => {
    socket.emit('send message', msg);
  });

  socket.on('chat message', (msg) => {
    console.log(msg);
  });
}

terminalLine.question('listen port? ', (msg) => {
  PORT = parseInt(msg);
  main();
});
