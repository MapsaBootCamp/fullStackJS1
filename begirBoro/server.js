const express = require("express");
const { userRouter, vehicleRouter } = require("./routes");

const app = express();
app.use(express.json());

function log(req, res, next) {
  console.log("ye darkhst umad!");
  next();
}

// app.use(log);

app.use("/user", userRouter);
app.use("/vehicle", vehicleRouter);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`server run on por ${PORT}`);
});
