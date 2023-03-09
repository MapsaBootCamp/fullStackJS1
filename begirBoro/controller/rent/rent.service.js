const db = require("../../db");

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

      return rent;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = rentService;
