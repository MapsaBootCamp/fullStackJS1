const mongoose = require("mongoose");
const Author = require("./author");

const bookSchema = new mongoose.Schema({
  name: String,
  page: Number,
  author: { type: mongoose.Types.ObjectId, ref: Author },
});

module.exports = mongoose.model("Book", bookSchema);
