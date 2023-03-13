const jwt = require("jsonwebtoken");
const { userService } = require("../modules/user");
const db = require("../db");

exports.tokenAuthentication = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({
      errorMessage: "token dar header ejbarie!",
    });
  }

  const token = authorization.includes("Bearer")
    ? authorization.split(" ")[1]
    : authorization;

  try {
    const { username } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await userService.getByUsername(username);
    req.user = user;
    next();
  } catch (error) {
    console.log("error token");
    return res.status(403).json({
      errorMessage: "invalod Token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  if (!req.user) {
    throw new Error(
      "in middleware hatman bayad bad az tokenAuthentication biad!"
    );
  }
  if (req.user.role === "ADMIN") {
    next();
  } else {
    const error = new Error();
    error.message = "ejazeh nadari!";
    error.status = 403;
    next(error);
  }
};
