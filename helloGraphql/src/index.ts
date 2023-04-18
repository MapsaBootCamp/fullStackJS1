import { graphqlHTTP } from "express-graphql";
import * as express from "express";
import schema from "./graphql/schema";
import mongoose from "mongoose";
import {Author} from "./models/author"

mongoose.connect("mongodb://localhost:27017/libraryProject")
const db = mongoose.connection
db.once("open", () => console.log("connected to DB"))

const app: express.Express = express();

type reqType = express.Request & {
  user: string;
};

app.get("/", async (req, res) => {
  try {
    const author = new Author({
      name: "Mohsen",
      description: "agjelihglieh"
    })
    console.log(author);
    await author.save()
    return res.end("OK")    
  } catch (error) {
    return res.end(error)
  }

})


app.use((req: reqType, res, next) => {
  console.log("sallam");
  req.user = "Ashkan";
  next();
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.ENV_MODE !== "production",
  })
);

app.listen(3001, () => {
  console.log("server run on port 3001");
});
