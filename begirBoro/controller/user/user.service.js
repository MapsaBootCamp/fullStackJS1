const db = require("../../db");

function updatedPermittedData(data) {
  const result = {};
  const permittedKeyChange = [
    "password",
    "sex",
    "address",
    "driveLicense",
    "weight",
  ];
  for (const key of permittedKeyChange) {
    if (data.hasOwnProperty(key)) {
      result[key] = data[key];
    }
  }
  return result;
}

const userService = {
  getById: async (id) => {
    return await db.user.findUnique({
      where: {
        id,
      },
    });
  },

  getAll: async () => {
    return await db.user.findMany();
  },
  update: async function (id, data) {
    try {
      const user = await this.getById(parseInt(id));
      console.log(updatedPermittedData(data));
      return updatedPermittedData(data);
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = userService;
