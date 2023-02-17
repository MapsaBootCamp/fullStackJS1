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

// fs.open(pathFile, "a+", (err, fd) => {
//   console.log(fd);
// });

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

