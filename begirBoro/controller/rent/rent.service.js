const db = require("../../db");
const { exclude } = require("../../utils/prisma.util");

const rentService = {
  addVehicleToUser: async (rentData) => {
    try {
      const { userId, vehicleId, reservedDate, dueDate, price } = rentData;

      const [rent, _] = await db.$transaction([
        db.rent.create({
          data: {
            userId,
            vehicleId,
            reservedDate,
            dueDate,
            price,
          },
        }),
        db.vehicle.update({
          where: {
            id: vehicleId,
          },
          data: {
            status: 1,
          },
        }),
      ]);

      return exclude(rent, ["userId"]);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getUserRentHistory: async (userId) => {
    try {
      const result = await db.rent.findMany({
        where: {
          userId,
        },
        include: {
          Vehicle: {
            select: {
              pelak: true,
              title: true,
            },
          },
        },
      });
      return result.map((res) => exclude(res, ["userId"]));
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = rentService;
