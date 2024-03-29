import { io } from 'socket.io-client';
import * as readline from 'readline';

const terminalLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let PORT;
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkdoYXNlbSIsImlhdCI6MTY4ODE0MjI3NywiZXhwIjoxNjg4MzE1MDc3fQ.mGUymOegz-EhFZFsGiVi1REXhASFjkgz4wZ0VnaXkU8';

function main() {
  const socket = io(`ws://localhost:${PORT}/location`, {
    auth: {
      token,
    },
  });

  terminalLine.on('line', (msg) => {
    const inputData = msg.split(' ');
    switch (inputData[0]) {
      case 'createRoom':
        socket.emit('create.room', inputData.splice(1).join(''));
        break;
      case 'sendMessage':
        socket.emit('send message', inputData.splice(1).join(''));
        break;
      case 'addUserToRoom':
        socket.emit('add.user.room', {
          username: inputData[1],
          roomId: inputData[2],
        });
        break;
      default:
        break;
    }
  });

  socket.on('chat message', (msg) => {
    console.log(msg);
  });
}

terminalLine.question('listen port? ', (msg) => {
  PORT = parseInt(msg);
  main();
});
