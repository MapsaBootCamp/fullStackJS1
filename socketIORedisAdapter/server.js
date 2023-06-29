const { Server } = require("socket.io");
const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

const PORT = parseInt(process.argv[2]);

const io = new Server();
const pubClient = createClient({ host: "localhost", port: 6379 });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));

  io.on("connection", (socket) => {
    console.log(`a user connected with socket id: ${socket.id}`);

    socket.on("send message", (msg) => {
      console.log(msg);
      io.emit("chat message", msg);
      // socket.broadcast.emit("broadcast message", msg);
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("chat message", `ye nafar dis shod`);
    });
  });
  io.listen(PORT);
});
