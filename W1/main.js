const { appendFile } = require("fs");
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

route.post("/register", (req, res) => {
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

function findTodoObj(req, res) {
  if (!Object.getOwnPropertyNames(req.query).length) {
    res.writeHead(StatusCodes.BAD_REQUEST);
    return res.end("id user bayad bedi!");
  }
  const { id } = req.query;
  const todo = db.Tasks.find((todo) => todo.id === parseInt(id));
  return todo;
}

route.get("/todo-detail", (req, res) => {
  const todo = findTodoObj(req, res);
  res.json(todo);
});

route.put("/todo-update", (req, res) => {
  const body = req.body;
  const { id } = req.query;
  const result = {};
  const todo = findTodoObj(req, res);

  if (!todo) {
    res.writeHead(StatusCodes.NOT_FOUND);
    return res.end(`task ba id ${req.query.id} vojud nadarad`);
  } else {
    todo["title"] = body["title"];
  }
  res.json(todo);
});

route.delete("/todo-delete", (req, res) => {
  const todo = findTodoObj(req, res);
  console.log(db.Tasks.indexOf(todo));
  db.Tasks.splice(db.Tasks.indexOf(todo), 1);
  res.writeHead(StatusCodes.NO_CONTENT);
  res.json({ message: "ba khubi khoshi hazf shod!" });
});

route.get("/about", (req, res) => {
  res.writeHead(StatusCodes.OK, contentTypes.html);
  res.end("About");
});

const server = http.createServer(route.handler);

server.listen(PORT, () => {
  console.log(`run server on port ${PORT}`);
});
