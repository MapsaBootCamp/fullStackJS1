const { contentTypes } = require("../content-types"),
  db = require("../db"),
  utils = require("../utils"),
  { StatusCodes } = require("http-status-codes");

function findTodoObj(req, res) {
  if (!Object.getOwnPropertyNames(req.query).length) {
    res.writeHead(StatusCodes.BAD_REQUEST);
    return res.end("id user bayad bedi!");
  }
  const { id } = req.query;
  const todo = db.Tasks.find((todo) => todo.id === parseInt(id));
  return todo;
}

exports.createTodo = (req, res) => {
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
};

exports.todoList = (req, res) => {
  res.writeHead(StatusCodes.OK, contentTypes.json);
  return res.json(
    db.Tasks.map((task) => {
      return {
        title: task.title,
        duer: db.Users.find((user) => user.id === task.user).username,
      };
    })
  );
};

exports.todoDetail = (req, res) => {
  const todo = findTodoObj(req, res);
  res.json(todo);
};

exports.todoUpdate = (req, res) => {
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
};

exports.todoDelete = (req, res) => {
  const todo = findTodoObj(req, res);
  console.log(db.Tasks.indexOf(todo));
  db.Tasks.splice(db.Tasks.indexOf(todo), 1);
  res.writeHead(StatusCodes.NO_CONTENT);
  res.json({ message: "ba khubi khoshi hazf shod!" });
};
