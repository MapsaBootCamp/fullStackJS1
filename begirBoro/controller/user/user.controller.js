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
  create: async (req, res) => {
    try {
      console.log(req.body);
      const userId = await userService.create(req.body);
      return res.status(201).send({
        userId,
      });
    } catch (error) {
      return res.send({
        error: true,
        message: error.message,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await userService.delete(id);
      return res.status(204).json(result);
    } catch (error) {
      return res.send({
        error: true,
        message: error.message,
      });
    }
  },
};

module.exports = userController;
