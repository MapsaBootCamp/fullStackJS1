const routing = {
  GET: {},
  POST: {},
};

exports.handler = (req, res) => {
  try {
    routing[req.method][req.url](req, res);
  } catch (error) {
    res.end("ERROR");
  }
};

exports.get = (url, action) => {
  routing.GET[url] = action;
};

exports.post = (url, action) => {
  routing.POST[url] = action;
};
