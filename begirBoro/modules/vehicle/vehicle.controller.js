const vehicleService = require("./vehicle.service");

const vehicleController = {
  get: async (req, res) => {
    const { id } = req.params;
    const vehicle = await vehicleService.getById(parseInt(id));
    return res.json(vehicle);
  },
  getAll: async (req, res) => {
    const vehicle = await vehicleService.getAll(req.query);
    return res.json(vehicle);
  },
};

module.exports = vehicleController;
