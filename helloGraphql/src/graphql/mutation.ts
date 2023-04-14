import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { BookType, BookUpdateType } from "./types";
import { books } from "../db";
import { argsToArgsConfig } from "graphql/type/definition";

export const addBook = {
  type: BookType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    page: { type: GraphQLInt },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: (_, args) => {
    const bookData = {
      id: books.length + 1,
      name: args.name,
      page: args.page,
      authorId: args.authorId,
    };
    books.push(bookData);
    return bookData;
  },
};

export const editBook = {
  type: BookType,
  args: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    input: { type: BookUpdateType },
  },
  resolve: (_, args) => {
    for (const book of books) {
      if (book.id === args.id) {
        for (const key in book) {
          if (Object.prototype.hasOwnProperty.call(book, key)) {
            if (args.input[key]) book[key] = args.input[key];
          }
        }
        return book;
      }
    }
  },
};
