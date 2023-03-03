const userService = require("./user.service");
const bcrypt = require("bcrypt");

const userController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await userService.getByUsername(username);
      if (!user) {
        return res.status(403).json({
          message: "invalid credential!",
        });
      }
      console.log("pass", password);
      console.log("db pass", user.password);
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass)
        return res.status(403).json({
          message: "invalid credential!",
        });
      return res.json("login shodi!");
    } catch (error) {
      return res.json({
        error: true,
        message: error.message,
      });
    }
  },
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
      const { password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const userId = await userService.create({
        ...req.body,
        password: hashedPassword,
      });
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
