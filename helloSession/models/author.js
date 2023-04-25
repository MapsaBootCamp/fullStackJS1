const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model("Author", authorSchema);
