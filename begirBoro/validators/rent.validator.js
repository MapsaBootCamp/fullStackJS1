const { body, check } = require("express-validator");
const db = require("../db");

exports.addToRentTable = [
  body("vehicleId").notEmpty().isInt(),
  body("dueDate").notEmpty().isDate(),
];

exports.returnVehicleValidator = [body("rentId").notEmpty().isInt()];
