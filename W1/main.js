const { appendFile } = require("fs");
const http = require("http"),
  { contentTypes } = require("./content-types"),
  route = require("./routes"),
  db = require("./db"),
  utils = require("./utils"),
  { StatusCodes } = require("http-status-codes"),
  { userController, taskController } = require("./controllers");
const PORT = process.env.PORT || 3001;

// TODO: 1. get all task, 2. get detail task, 3. create task, 4. edit task, 5. delete task =====> CRUD

route.get("/", (req, res) => {
  const path = "./view/index.html";
  return utils.getFile(path, res);
});

//// user routes
route.post("/register", userController.register);
route.get("/user-list", userController.usersList);
// route.get("/user-detail", userController.getUser);

//// todos routes
route.get("/todos", taskController.todoList);
route.post("/todos", taskController.createTodo);
route.get("/todo-detail", taskController.todoDetail);
route.put("/todo-update", taskController.todoUpdate);
route.delete("/todo-delete", taskController.todoDelete);

const server = http.createServer(route.handler);

server.listen(PORT, () => {
  console.log(`run server on port ${PORT}`);
});
