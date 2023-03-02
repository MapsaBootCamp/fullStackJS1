const userService = require("./user.service");

const userController = {
  get: async (req, res) => {
    const { id } = req.params;
    const user = await userService.getById(parseInt(id));
    return res.json(user);
  },
};

module.exports = userController;
