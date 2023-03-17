import { Router } from "express";
import { AppController } from "../controllers";
import { AppService } from "../services";

const router = Router();

const appController = new AppController(new AppService());

router.get("/cat-list", (req, res, next) =>
  appController.getAllCat(req, res, next)
);

export default router;
