const express = require("express");
const jsonMiddleware = express.json();

function json(req, res, next) {
  if (req.headers["content-type"] !== "application/json") {
    const error = new Error("Content-type must be 'application/json'");
    error.status = 406;
    throw error;
  }
  return jsonMiddleware(req, res, next);
}

module.exports = json;
