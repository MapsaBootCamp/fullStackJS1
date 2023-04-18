import mongoose from "mongoose";
import { Author } from "./author";

const bookSchema = new mongoose.Schema({
  name: String,
  page: Number,
  author: { type: mongoose.Types.ObjectId, ref: Author },
});

export const Book = mongoose.model("Book", bookSchema);
