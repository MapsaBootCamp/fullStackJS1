const fs = require("fs");
const path = require("path");
const os = require("os");
const util = require("util");

// fs.readFile(path.join(process.cwd(), "config.json"), "utf-8", (err, data) => {
//   if (err) {
//     throw new Error(err);
//   }
//   const config = JSON.parse(data);
//   console.log(config);
//   //   console.log(data);
// });

pfs = {
  readFile: util.promisify(fs.readFile),
};

// pfs
//   .readFile(path.join(process.cwd(), "config.json"), "utf-8")
//   .then((data) => console.log(JSON.parse(data)))
//   .catch((err) => console.log(err));

async function getDataAsync(path) {
  try {
    const data = await pfs.readFile(path, "utf-8");
    console.log(JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
}
getDataAsync(path.join(process.cwd(), "config.json"));

// console.log(__dirname);
// console.log(__filename);
// console.log(module);
// console.log(exports);

// console.log(path.basename(__filename));
// console.log(path.extname(__filename));
// console.log(path.resolve());

// console.log(path.join(process.cwd(), "helloNode.js"));

// console.log("in file");
