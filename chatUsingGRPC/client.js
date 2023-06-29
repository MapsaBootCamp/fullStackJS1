const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const readline = require("readline");

const terminalLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const PROTO_PATH = __dirname + "/protos/chat.proto";
const REMOTE_SERVER = "localhost:5000";

const packageDef = protoLoader.loadSync(PROTO_PATH);
const chatExample = grpc.loadPackageDefinition(packageDef).chatExample;

let username;
// let username = process.argv[2];

const client = new chatExample.Chat(
  REMOTE_SERVER,
  grpc.credentials.createInsecure()
);

function logMessage(msg) {
  if (msg.user !== username) {
    console.log(`user ${msg.user} sends: ${msg.text}`);
  }
}

function main() {
  const call = client.sendMessage();

  call.write({
    user: username,
    text: `${username} joined!`,
    event: "join",
  });

  call.on("data", logMessage);

  terminalLine.on("line", (txt) => {
    call.write({
      user: username,
      text: txt,
      event: "message",
    });
  });
}

terminalLine.question("what is yout name? ", (msg) => {
  username = msg;
  main();
});

// main();
