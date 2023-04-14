import { GraphQLInt, GraphQLList, GraphQLObjectType } from "graphql";
import { books, authors } from "../db";
import { AuthorType, BookType } from "./types";

export const booksQuery = {
  type: GraphQLList(BookType),
  resolve: (_, args, { user }) => {
    console.log(user);
    return books;
  },
};

export const bookQuery = {
  type: BookType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: (_, args) => books.find((book) => book.id === args.id),
};

export const authorsQuery = {
  type: GraphQLList(AuthorType),
  resolve: () => authors,
};
