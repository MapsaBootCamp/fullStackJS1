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
      if (key === "sex") {
        result[key] = data[key] ? true : false;
        continue;
      }
      result[key] = data[key];
    }
  }
  return result;
}

function createPermittedData(data) {
  const result = {};
  const permittedKeyChange = [
    "email",
    "password",
    "sex",
    "address",
    "driveLicense",
    "weight",
  ];
  for (const key of permittedKeyChange) {
    if (data.hasOwnProperty(key)) {
      if (key === "sex") {
        result[key] = data[key] ? true : false;
        continue;
      }
      result[key] = data[key];
    }
  }
  return result;
}

const userService = {
  authenticate: async (username, password) => {},
  getByUsername: async (username) => {
    return await db.user.findUnique({
      where: {
        email: username,
      },
    });
  },
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
  create: async (data) => {
    try {
      const user = await db.user.create({
        data: createPermittedData(data),
      });
      return user.id;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  update: async (id, data) => {
    try {
      const result = await db.user.update({
        where: { id: parseInt(id) },
        data: updatedPermittedData(data),
      });
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
  delete: async (id) => {
    try {
      return await db.user.delete({
        where: {
          id: parseInt(id),
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = userService;
