import { Request, Response, NextFunction } from "express";
import { AppService } from "../services";

// const appService: AppService = new AppService();

class AppController {
  private appService: AppService;
  constructor(appService: AppService) {
    this.appService = appService;
  }

  async getAllCat(req: Request, res: Response, next: NextFunction) {
    try {
      const cats = await this.appService.getAllCat();
      return res.json(cats);
    } catch (error) {
      error.status = 500;
      next(error);
    }
  }
}

export default AppController;
