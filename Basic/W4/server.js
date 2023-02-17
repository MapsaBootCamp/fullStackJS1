const http = require("http");
const url = require("url");
const { routes } = require("./routes");

//////// create Server

const server = http.Server();

const port = process.env.PORT || 3000;

server.on("request", (req, res) => {
  const pathAddr = url.parse(req.url).pathname.toLowerCase();
  const queryParams = url.parse(req.url).query;

  console.log(res.socket.remoteAddress);

  req.query = !queryParams
    ? {}
    : queryParams.split("&").reduce((prev, cur) => {
        const [key, val] = cur.split("=");
        return { ...prev, [key]: val };
      }, {});

  if (!Object.getOwnPropertyNames(routes).includes(pathAddr)) {
    res.writeHead(404);
    return res.end("Not Found");
  } else {
    return routes[pathAddr](req, res);
  }
});

server.listen(port, "0.0.0.0", () =>
  console.log(`server is running on port ${port}`)
);
