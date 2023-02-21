const http = require("http"),
  { contentTypes } = require("./content-types"),
  route = require("./routes"),
  db = require("./db"),
  utils = require("./utils"),
  { StatusCodes } = require("http-status-codes");

const PORT = process.env.PORT || 3001;

// TODO: 1. get all task, 2. get detail task, 3. create task, 4. edit task, 5. delete task =====> CRUD

route.get("/", (req, res) => {
  const path = "./view/index.html";
  return utils.getFile(path, res);
});

route.get("/todos", (req, res) => {
  res.writeHead(StatusCodes.OK, contentTypes.json);
  return res.json(
    db.Tasks.map((task) => {
      return {
        title: task.title,
        duer: db.Users.find((user) => user.id === task.user).username,
      };
    })
  );
});

route.post("/todos", (req, res) => {
  const body = req.body;
  const result = {};
  if (!body) {
    res.writeHead(StatusCodes.OK, contentTypes.json);
    result.error = true;
    result.message = "for create task send data!";
    return res.end(JSON.stringify(result));
  } else {
    const { title, user, dueDate } = body;
    const userObj = db.Users.find((val) => {
      return val.username === user;
    });
    if (!userObj) {
      res.writeHead(StatusCodes.OK, contentTypes.json);
      result.error = true;
      result.message = `user ba name ${user} nadarim!`;
      return res.json(result);
    }
    const tempDate = new Date();
    tempDate.setDate(tempDate.getDate() + parseInt(dueDate));
    const todo = {
      id: db.Tasks.length,
      title,
      user: userObj.id,
      done: false,
      dueDate: tempDate,
    };
    db.Tasks.push(todo);
    res.json(todo);
  }
});

route.get("/todo-detail", (req, res) => {
  console.log(req.query);
  res.end("OK");
});

route.get("/about", (req, res) => {
  res.writeHead(StatusCodes.OK, contentTypes.html);
  res.end("About");
});

const server = http.createServer(route.handler);

server.listen(PORT, () => {
  console.log(`run server on port ${PORT}`);
});
