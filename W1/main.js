const http = require("http"),
  { contentTypes } = require("./content-types"),
  route = require("./routes"),
  db = require("./db"),
  utils = require("./utils"),
  { StatusCodes } = require("http-status-codes");

const PORT = process.env.PORT || 3000;

// TODO: 1. get all task, 2. get detail task, 3. create task, 4. edit task, 5. delete task =====> CRUD

route.get("/", (req, res) => {
  const path = "./view/index.html";
  return utils.getFile(path, res);
});

route.get("/todos", (req, res) => {
  res.writeHead(StatusCodes.OK, contentTypes.json);
  return utils.jsonSerialize(db.Tasks, res);
});

route.get("/about", (req, res) => {
  res.writeHead(StatusCodes.OK, contentTypes.html);
  res.end("About");
});

http.createServer(route.handler).listen(PORT, () => {
  console.log(`run server on port ${PORT}`);
});
