import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from "graphql";
import { AuthorType, BookListType, BookType } from "./types";
import { Author } from "../models/author";
import { Book } from "../models/book";

export const booksQuery = {
  type: GraphQLList(BookListType),
  resolve: async (_, args, { headers }) => {
    try {
      console.log("++++++++++++++++++++++++++++++++++");
      console.log(headers);
      return await Book.find({}).populate("author");
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const bookQuery = {
  type: BookType,
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (_, args) => {
    try {
      return await Book.findById(args.id);
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const authorsQuery = {
  type: GraphQLList(AuthorType),
  resolve: async () => {
    try {
      return await Author.find({});
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const authorQuery = {
  type: AuthorType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, args) => {
    try {
      console.log("id", args.id);

      const author = await Author.findById(args.id);
      console.log(author);
      return author;
    } catch (error) {
      throw new Error(error);
    }
  },
};
