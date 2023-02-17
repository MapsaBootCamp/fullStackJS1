const controller = require("./controllers");

const routes = {
  "/": controller.home,
  "/about": controller.about,
  "/user-list": controller.getUsers,
};

module.exports = {
  routes,
};
