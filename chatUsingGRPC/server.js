const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = __dirname + "/protos/chat.proto";
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "127.0.0.1";

const packageDef = protoLoader.loadSync(PROTO_PATH);
const chatExample = grpc.loadPackageDefinition(packageDef).chatExample;

users = [];

function sendMessage(call, cb) {
  users.push(call);
  call.on("data", (msg) => {
    switch (msg.event) {
      case "join":
        console.log(`user ${msg.user} joined!`);
        notifyMessage({
          user: "Server",
          text: `user ${msg.user} joined!`,
        });
        break;
      case "message":
        console.log(`received message: ${msg.text}- from user ${msg.user}!`);
        notifyMessage(msg);
      default:
        break;
    }
  });
}

function notifyMessage(msg) {
  users.forEach((user) => {
    user.write(msg);
  });
}

function main() {
  const server = new grpc.Server();

  server.addService(chatExample.Chat.service, {
    sendMessage: sendMessage,
  });

  server.bindAsync(
    `localhost:5000`,
    grpc.ServerCredentials.createInsecure(),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("server started!");
        server.start();
      }
    }
  );
}

main();
