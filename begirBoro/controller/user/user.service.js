const db = require("../../db");

const userService = {
  getById: async (id) => {
    return await db.user.findUnique({
      where: {
        id,
      },
    });
  },
};

module.exports = userService;
