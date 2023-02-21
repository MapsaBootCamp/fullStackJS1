const fs = require("fs");
const path = require("path");
const axios = require("axios");
const http = require("http");

// fs.readFile(
//   path.join(__dirname, "../W3", "/config.json"),
//   "utf-8",
//   (err, data) => {
//     if (err) {
//       throw new Error(err);
//     } else {
//       console.log(data);
//     }
//   }
// );

// fs.writeFile("./note.txt", "Bye\n", { flag: "a" }, (err) => {
//   if (err) {
//     console.log(err);
//   }
// });

// fs.readFile("./note.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

const pathFile = "./note.txt";
const writeData = "Hey";

// fs.promises
//   .readFile(pathFile, "utf-8")
//   .then((data) => console.log(data))
//   .then(() => fs.promises.writeFile(pathFile, writeData, { flag: "a" }))
//   .catch((err) => console.log(err));

const buffer_ = Buffer.alloc(30);
const offset = 3;
const position = 2;
const length = 26;

// const
fs.open(pathFile, "a+", (err, fd) => {
  if (err) {
    throw new Error(err);
  }

  fs.read(fd, buffer_, offset, length, position, (err, byte, buffer) => {
    if (err) {
      throw new Error(err);
    }
    const write_buff = Buffer.from("\nSalam");
    fs.write(fd, write_buff, (err, written, buffer) => {
      if (err) {
        throw new Error(err);
      }
      console.log("written: ", written);
      console.log("buffer write: ", buffer.toString());
    });
    console.log("byte: ", byte);
    console.log("buffer: ", buffer.toString());
  });
});

async function getData() {
  try {
    const res = await fetch("https://api.github.com/users/teghfo/repos");
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Promise.allSettled([
//   fetch("https://api.github.com/users/teghfo/repos"),
//   fetch("https://api.github.com/users/farshadalemi/repos"),
// ])
//   .then((result) => result.map((res) => res.value.json()))
//   .then((listDataProm) =>
//     console.log(
//       listDataProm.map((res) => res.then((data) => console.log(data)))
//     )
//   )
//   .catch((err) => console.log(err))
//   .finally(() => console.log("finally"));

// axios
//   .get("https://jsonplaceholder.typicode.com/todos/1")
//   .then((res) => console.log(res.data))
//   .catch((err) => console.log(err));
