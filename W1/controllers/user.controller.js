const { contentTypes } = require("../content-types"),
  db = require("../db"),
  utils = require("../utils"),
  { StatusCodes } = require("http-status-codes");



exports.register = (req, res) => {
  const { username } = req.body;
  if (!username) {
    res.writeHead(StatusCodes.BAD_REQUEST);
    return res.json({
      error: true,
      message: "username ejbari ast!",
    });
  } else {
    db.run(`INSERT INTO User(username) VALUES(?)`, [username], (err) => {
      if (err) {
        return res.json({
          error: true,
          message: err.message,
        });
      } else {
        res.writeHead(StatusCodes.CREATED);
        return res.end("user sakhte shod");
      }
    });
  }
};

// exports.getUser = async (req, res) => {
//   db.get("SELECT * FROM User WHERE userID=?", req.query.id, (err, user) => {
//     if (err) {
//       return res.json({
//         error: true,
//         message: err.message,
//       });
//     } else {
//       res.json(user);
//     }
//   });
// };

exports.usersList = async (req, res) => {
  db.all("SELECT userID, username FROM User", (err, users) => {
    if (err) {
      throw new Error(err.message);
    } else {
      res.json(users);
    }
  });
};
