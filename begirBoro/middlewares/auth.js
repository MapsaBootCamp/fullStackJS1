const jwt = require("jsonwebtoken");
const { userService } = require("../controller/user");

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
