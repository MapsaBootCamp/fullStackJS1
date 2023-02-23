const sqlite3 = require("sqlite3").verbose();

const DBFILENAME = "todoDB.sqlite3";

const db = new sqlite3.Database(DBFILENAME, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to db....");

    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS User(
                      userID INTEGER PRIMARY KEY,
                      username TEXT NOT NULL UNIQUE,
                      password TEXT
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS Task(
                      taskID INTEGER PRIMARY KEY,
                      title TEXT NOT NULL,
                      user INTEGER NOT NULL,
                      done INTEGER NOT NULL CHECK (done IN (0, 1)),
                      dueDate TEXT NOT NULL,
                      FOREIGN KEY (user)
                        REFERENCES User(userID)
      )`);
    });
  }
});

module.exports = db;

exports.Users = [
  {
    id: 0,
    username: "Ashkan",
  },
  {
    id: 1,
    username: "Mohsen",
  },
];

exports.Tasks = [
  {
    id: 0,
    title: "panir bekhar",
    user: 0,
    done: false,
    dueDate: new Date(),
  },
  {
    id: 1,
    title: "henduneh bekhar",
    user: 1,
    done: false,
    dueDate: new Date(),
  },
];
