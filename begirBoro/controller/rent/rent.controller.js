const { vehicleService } = require("../vehicle");
const rentService = require("./rent.service");
const rentController = {
  makeRent: async (req, res) => {
    try {
      const reservedDate = new Date();
      const { vehicleId, dueDate } = req.body;
      const vehicle = await vehicleService.getById(vehicleId);
      console.log("status: ", vehicle.status);
      if (Number(vehicle.status)) {
        return res.json({
          status: "mojud nist",
        });
      }
      const rent = await rentService.addVehicleToUser({
        userId: req.user.id,
        vehicleId,
        dueDate: new Date(dueDate),
        reservedDate,
        price: 200,
      });
      return res.status(201).json(rent);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = rentController;
