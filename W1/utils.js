const fs = require("fs"),
  { StatusCodes } = require("http-status-codes");

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

exports.jsonSerialize = (data, res) => {
  res.end(JSON.stringify(data));
};

