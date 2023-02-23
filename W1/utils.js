const fs = require("fs"),
  { StatusCodes } = require("http-status-codes");
const { resolve } = require("path");

exports.getFile = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR);
      res.end(err);
    } else {
      res.end(data);
    }
  });
};

exports.parseJsonBody = (req) => {
  return new Promise((resolve) => {
    let body = [];
    req
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        resolve(JSON.parse(body));
      });
  });
};

exports.jsonSerialize = (data, res) => {
  res.end(JSON.stringify(data));
};

exports.parseQueryFromUrl = (url) => {
  if (!url) return {};
  return url.split("&").reduce((prevVal, currVal) => {
    const [key, val] = currVal.split("=");
    return { ...prevVal, [key]: val };
  }, {});
};
