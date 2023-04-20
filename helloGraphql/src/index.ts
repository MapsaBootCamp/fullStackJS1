import { graphqlHTTP } from "express-graphql";
import * as path from "path";
import * as express from "express";
import schema from "./graphql/schema";
import mongoose from "mongoose";
import * as cookieParser from "cookie-parser";
import * as expressSession from "express-session";
import * as passport from "passport";
import * as flash from "connect-flash";

import User from "./models/user";

mongoose.connect("mongodb://localhost:27017/libraryProject");
const db = mongoose.connection;
db.once("open", () => console.log("connected to DB"));

const app: express.Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("my key"));
app.use(
  expressSession({
    secret: "my key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 400000 },
  })
);

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

type reqType = express.Request & {
  user: any;
};

app.get("/", (req: reqType, res) => {
  console.log(req.user);
  return res.render("home", {
    user: req.user,
  });
});

app
  .route("/login")
  .get((req, res) => {
    return res.render("login", {});
  })
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    (req, res) => {
      console.log(req);
      return res.redirect("/");
    }
  );

app
  .route("/register")
  .get((req, res) => {
    return res.render("register", {});
  })
  .post((req, res) => {});

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
