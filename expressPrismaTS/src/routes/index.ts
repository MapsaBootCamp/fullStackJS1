import { Express } from "express";

import appRouter from "./app.route";

function router(expressApp: Express) {
  expressApp.use("/app", appRouter);
}

export default router;
