const { user } = require("../../db");
const db = require("../../db");
const { exclude } = require("../../utils/prisma.util");

const rentService = {
  getRentById: async (rentId) => {
    const rent = await db.rent.findUnique({
      where: {
        id: Number(rentId),
      },
    });
    return rent;
  },
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
  returnVehicleService: async (rent) => {
    try {
      const [newRent, newVehicle] = await db.$transaction([
        db.rent.update({
          where: {
            id: rent.id,
          },
          data: {
            returnDate: new Date(),
          },
        }),
        db.vehicle.update({
          where: {
            id: rent.vehicleId,
          },
          data: {
            status: 0,
          },
        }),
      ]);
      return [newRent, newVehicle];
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
  rentAveragePrice: async () => {
    return await db.rent.aggregate({
      _avg: {
        price: true,
      },
    });
  },
};

module.exports = rentService;
