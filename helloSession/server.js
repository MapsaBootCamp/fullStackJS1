const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const User = require("./models/user");
const redis = require("redis");
const RedisStore = require("connect-redis").default;

const redisClient = redis.createClient();
redisClient.connect().catch(console.error);
const redisStoreSession = new RedisStore({ client: redisClient });

async function testRedis() {
  await redisClient.connect();
  await redisClient.set("camp", "mapsa");
  const phone = "91212345678";
  await redisClient.set(`phone:${phone}`, "6532", { EX: 2 * 60 });
  await redisClient.set("phoneNumber", "9121234567");
  return "OK";
}

// testRedis().then((msg) => console.log(msg));

mongoose.connect("mongodb://localhost:27017/libraryProject");
const db = mongoose.connection;
db.once("open", () => console.log("connected to DB"));

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("MyKey"));
app.use(
  expressSession({
    store: redisStoreSession,
    secret: "MyKey",
    resave: false,
    saveUninitialized: false,
    maxAge: 400 * 1000,
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

app.get("/", (req, res) => {
  console.log(req.user);
  return res.render("home", {
    user: req.user,
    message: req.flash("info"),
  });
});

app
  .route("/login")
  .get((req, res) => {
    return res.render("login", { message: req.flash("error")[0] });
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/",
      successMessage: "succefully logined!",
      successFlash: true,
      failureRedirect: "/login",
      failureFlash: true,
    }),
    (req, res) => {
      console.log(req);
      return res.redirect("/");
    }
  );

app.get("/logout", (req, res) => {
  req.logout({}, (err) => {});
  return res.redirect("/");
});

app
  .route("/add-address")
  .get((req, res) => {
    if (!req.isAuthenticated()) return res.redirect("login");
    return res.render("addAddress");
  })
  .post(async (req, res) => {
    if (!req.isAuthenticated()) return res.redirect("login");
    try {
      const user = await User.findOne({
        email: req.user.email,
      });
      user.addresses.push(req.body);
      await user.save();
      return res.redirect("/");
    } catch (error) {
      return res.json(error);
    }
  });

app
  .route("/register")
  .get((req, res) => {
    return res.render("register", {});
  })
  .post((req, res) => {});

app.listen(3001, () => {
  console.log("server run on port 3001");
});
