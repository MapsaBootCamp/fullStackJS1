console.log("ssssssssssss");
import * as express from "express"; /// const express = require("express")
import router from "./routes";

const app = express();
app.use(express.json());

router(app);

app.use((error, req, res, next) => {
  console.log(error);
  return res.status(error.status).send(error.message);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`start app on port ${PORT}`);
});
