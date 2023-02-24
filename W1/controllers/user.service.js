const db = require("../db");

function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM User WHERE username=?", username, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

module.exports = {
  getUserByUsername,
};
