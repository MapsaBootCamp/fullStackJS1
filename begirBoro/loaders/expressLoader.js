const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const router = require("../routes");
const config = require("../config");
const multer = require("multer");
const cors = require("cors");
const helmet = require("helmet");

class ExpressLoader {
  constructor() {
    this.app = express();
    /// application/json
    this.app.use(express.json());
    /// application/xwww
    this.app.use(express.urlencoded({ extended: true }));
    /// form/multipart
    this.app.use(multer({ dest: "./uploads/" }).array("pic"));
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.app.use(helmet());

    const apiRoute = express.Router();
    router(apiRoute);

    this.app.use("/api/v1", apiRoute);

    this.app.post("/form", (req, res, next) => {
      console.log(req.body);
      console.log(req.files);
      return res.end("form endpoint!");
    });
    this.app.get("/error", (req, res) => {
      throw new Error("Error rokh dad");
    });

    //// TODO: modular!
    this.app.use(errorHandler);

    this.app.use((req, res) => {
      res.status(404).send({
        error: "NotFoundError",
      });
    });
  }
  run() {
    this.app.listen(config.PORT, () => {
      console.log(`server run on por ${config.PORT}`);
    });
  }
}

module.exports = ExpressLoader;
