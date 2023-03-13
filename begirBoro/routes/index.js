const userRouter = require("./user.route");
const vehicleRouter = require("./vehicle.route");
const rentRouter = require("./rent.route");

module.exports = router;

function router(app) {
  app.use("/user", userRouter);
  app.use("/vehicle", vehicleRouter);
  app.use("/rent", rentRouter);
}
