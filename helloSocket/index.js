const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const onlineUsers = new Map();

app.get("/", (req, res) => {
  const filePath = __dirname + "/index.html";
  return res.sendFile(filePath);
});

io.on("connection", (socket) => {
  console.log(`a user connected with socket id: ${socket.id}`);

  //   socket.broadcast.emit(
  //     "chat message",
  //     `ye nafar vasl shod ba id ${socket.id}`
  //   );

  socket.on("login user", (msg) => {
    socket.broadcast.emit("chat message", `user ${msg} vared shode`);
    onlineUsers.set(socket.id, msg);
    io.emit("Is Online", Array.from(onlineUsers.values()));
  });

  socket.on("is typing", (msg) => {
    socket.broadcast.emit("log is typing", `${msg} is typing...`);
  });

  socket.on("send message", (msg) => {
    console.log(msg);
    io.emit("chat message", msg);
    // socket.broadcast.emit("broadcast message", msg);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("chat message", `ye nafar dis shod`);
    onlineUsers.delete(socket.id);
    socket.broadcast.emit("Is Online", Array.from(onlineUsers.values()));
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server run on port ${PORT}`);
});
