const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const User = require("./models/user");
const Book = require("./models/book");
const redis = require("redis");
const RedisStore = require("connect-redis").default;
// const setTz = require("set-tz");
const redisClient = redis.createClient();
redisClient.connect().catch(console.error);
const redisStoreSession = new RedisStore({ client: redisClient });

// process.env.TZ = "Asia/Tehran";
// setTz("Asia/Tehran");

console.log(new Date().toString());
async function testRedis() {
  // await redisClient.connect();
  // await redisClient.set("camp", "mapsa");
  // const phone = "91212345678";
  // await redisClient.set(`phone:${phone}`, "6532", { EX: 2 * 60 });
  // await redisClient.set("phoneNumber", "9121234567");
  // return "OK";
  // console.log(await redisClient.lRange("users", 0, -1));
  // console.log(await redisClient.hGetAll("user"));
}

// testRedis().then((msg) => console.log(msg));

mongoose.connect("mongodb://localhost:27017/libraryProject");
const db = mongoose.connection;
db.once("open", () => console.log("connected to DB"));

const app = express();

const hour = 3600000;

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser("MyKey"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  expressSession({
    store: redisStoreSession,
    secret: "MyKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure: true, /// https
      // expires: new Date(Date.now() + hour),
      maxAge: hour,
    },
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

app.get("/", (req, res) => {
  /// anonymous ====> cart
  req.session.cart = ["Cat", "Dog"];
  res.cookie("camp", "mapsa", { maxAge: 300000 });
  return res.render("home", {
    user: req.user,
    message: req.flash("info"),
  });
});

app
  .route("/login")
  .get((req, res) => {
    console.log(req.cookies);
    return res.render("login", { message: req.flash("error")[0] });
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

app.get("/logout", (req, res) => {
  req.logout({}, (err) => {});
  return res.redirect("/");
});

////// aggregation pipline ====> $match, $expr, $group, $project, $lookup, $unwind

app.get("/author-total-page", async (req, res) => {
  const result = await Book.aggregate([
    {
      $match: {},
    },
    {
      $group: {
        _id: "$author",
        totalPage: { $sum: "$page" },
        bookCount: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "authors",
        localField: "_id",
        foreignField: "_id",
        as: "authorName",
      },
    },
    {
      $unwind: "$authorName",
    },
    // {
    //   $project: {
    //     _id: 0,
    //     authorName: "$authorName.name",
    //     pageByAuthor: "$totalPage",
    //   },
    // },
  ]);
  return res.end(JSON.stringify(result));
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
