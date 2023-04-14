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
    this._multerConfig();

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
      return res.end("form endpoint!");
    });

    this.app.post(
      "/upload",
      this.uploadMulterInstance.single("file"),
      (req, res, next) => {
        console.log(req.body);
        return res.end("file uploaded successfully!");
      }
    );

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

  _multerConfig() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        console.log("file size in multer", req.file.size);
        console.log("file type:", file.mimetype);
        cb(null, "uploads/");
      },
      filename: (req, file, cb) => {
        cb(null, `image-${new Date().getTime()}-${file.originalname}`);
      },
    });
    this.uploadMulterInstance = multer({ storage });
  }

  run() {
    this.app.listen(config.PORT, () => {
      console.log(`server run on por ${config.PORT}`);
    });
  }
}

module.exports = ExpressLoader;
