const db = require("../../db");

const vehicleService = {
  getById: async (id) => {
    return await db.vehicle.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        pelak: true,
        Category: {
          select: {
            title: true,
          },
        },
      },
    });
  },

  getAll: async (filterData) => {
    const { title, categoryId } = filterData;

    return await db.vehicle.findMany({
      where: {
        AND: [
          title ? { title } : {},
          categoryId ? { categoryId: Number(categoryId) } : {},
        ],
      },
      select: {
        id: true,
        title: true,
      },
    });
  },
};

module.exports = vehicleService;
