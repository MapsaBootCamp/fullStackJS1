const next = (msg) => {
  console.log("ERROR");
  console.log(msg);
};

const req = "REQ";
const res = "RES";

const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

catchAsync(async (req, res, next) => {
  console.log("HH");
  throw new Error("error rokh dad");
})(req, res, next);
