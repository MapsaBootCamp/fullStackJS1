import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { BookType, BookUpdateType, AuthorType } from "./types";
import { books } from "../db";
import { argsToArgsConfig } from "graphql/type/definition";
import { Author } from "../models/author";
import { Book } from "../models/book";

export const addAuthor = {
  type: AuthorType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    try {
      const author = await Author.create({
        name: args.name,
        description: args.description,
      });
      return author;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const addBook = {
  type: BookType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    page: { type: GraphQLInt },
    authorId: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, args) => {
    try {
      const author = await Author.findById(args.authorId);
      if (author) {
        const book = await Book.create({
          name: args.name,
          page: args.page,
          author,
        });
        return book;
      }
      throw new Error("author not found");
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const editBook = {
  type: BookType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    input: { type: BookUpdateType },
  },
  resolve: async (_, args) => {
    try {
      await Book.findByIdAndUpdate(args.id, args.input);
      return await Book.findById(args.id);
    } catch (error) {}
  },
};
