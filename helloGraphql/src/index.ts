import { graphql, buildSchema } from "graphql";
var { graphqlHTTP } = require("express-graphql");
import * as express from "express";

const app: express.Express = express();

var schema = buildSchema(`
  type Query {
    users: [String]
  }
`);

const resolver = { users: () => ["Ashkan", "Gholam"] };

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true,
  })
);

app.listen(3001, () => {
  console.log("server run on port 3001");
});
