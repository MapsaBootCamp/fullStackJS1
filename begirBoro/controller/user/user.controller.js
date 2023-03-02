const userService = require("./user.service");

const userController = {
  get: async (req, res) => {
    const { id } = req.params;
    const user = await userService.getById(parseInt(id));
    return res.json(user);
  },
  getAll: async (req, res) => {
    const user = await userService.getAll();
    return res.json(user);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const result = await userService.update(id, req.body);
    return res.send(result);
  },
};

module.exports = userController;
