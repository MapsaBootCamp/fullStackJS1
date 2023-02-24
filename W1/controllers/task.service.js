const db = require("../db");

function createTask(taskObj) {
  const { title, userID, dueDate } = taskObj;
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO Task(title, user, done, dueDate) VALUES(?, ?, ?, ?)`,
      [title, userID, false, dueDate],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

module.exports = {
  createTask,
};
