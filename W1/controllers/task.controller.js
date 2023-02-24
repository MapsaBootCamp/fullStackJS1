const { contentTypes } = require("../content-types"),
  db = require("../db"),
  utils = require("../utils"),
  userService = require("./user.service"),
  taskService = require("./task.service"),
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

exports.createTodo = async (req, res) => {
  const body = req.body;
  const result = {};
  if (!body) {
    res.writeHead(StatusCodes.OK, contentTypes.json);
    return utils.errResponse(res, "for create task send data!");
  } else {
    try {
      const { title, username, dueDate } = body;
      const userObj = await userService.getUserByUsername(username);
      if (!userObj) {
        res.writeHead(StatusCodes.NOT_FOUND, contentTypes.json);
        return utils.errResponse(res, "chenin useri nadarim");
      }
      const tempDate = new Date();
      tempDate.setDate(tempDate.getDate() + parseInt(dueDate));
      const taskObj = {
        title,
        userID: userObj.userID,
        dueDate: tempDate,
      };
      await taskService.createTask(taskObj);
      res.writeHead(StatusCodes.CREATED, contentTypes.json);
      return res.json({
        error: false,
        message: `task ${title} sakhte shod`,
      });
    } catch (error) {
      return utils.errResponse(res, error.message);
    }
  }
};

exports.todoList = (req, res) => {
  const { username } = req.query;
  const dbQuery = username
    ? "SELECT taskID, username, title as taskTitle, done, dueDate FROM Task INNER JOIN User ON Task.user=User.userID WHERE username=?"
    : "SELECT taskID, username, title as taskTitle, done, dueDate FROM Task INNER JOIN User ON Task.user=User.userID";
  console.log(username);
  res.writeHead(StatusCodes.OK, contentTypes.json);
  db.all(dbQuery, username, (err, tasks) => {
    if (err) {
      return utils.errResponse(res, err.message);
    } else {
      return res.json(tasks);
    }
  });
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
