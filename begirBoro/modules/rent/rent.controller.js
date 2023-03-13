const generateError = require("../../utils/generateError");
const { login } = require("../user/user.controller");
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

  getUserRentHistory: async (req, res) => {
    try {
      const rentHistory = await rentService.getUserRentHistory(req.user.id);
      return res.status(200).json(rentHistory);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  returnVehicle: async (req, res) => {
    try {
      const { user } = req;
      const { rentId } = req.body;
      const rent = await rentService.getRentById(rentId);
      const checkPermission =
        user.role === "Admin" ? true : rent?.userId === user.id ? true : false;
      if (checkPermission) {
        const [newRent, newVehicle] = await rentService.returnVehicleService(
          rent
        );
        return res.status(201).json({
          message: `vehicle ${newVehicle.title} be khubi bargasht khord!`,
        });
      }
      return res.status(403);
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
  getAveragePrice: async (req, res) => {
    try {
      const result = await rentService.rentAveragePrice();
      return res.status(200).send(result);
    } catch (error) {
      error = generateError(error, 500);
      throw error;
    }
  },
};

module.exports = rentController;
