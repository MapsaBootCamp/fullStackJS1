exports.home = (req, res) => {
  res.write("Home");
  return res.end();
};

exports.about = (req, res) => {
  res.write("About");
  return res.end();
};

const users = [
  {
    id: 1,
    username: "Ashkan",
    age: 23,
  },
  {
    id: 2,
    username: "Asghar",
    age: 21,
  },
];
exports.getUsers = (req, res) => {
  res.setHeader("Content-Type", "application/json;");
  return res.end(JSON.stringify(users));
};
