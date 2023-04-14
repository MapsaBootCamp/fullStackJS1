import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { authors, books } from "../db";

const BookTypeInAuthor = new GraphQLObjectType({
  name: "BookTypeInAuthor",
  description: "author info for books",
  fields: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
  },
});

export const BookUpdateType = new GraphQLInputObjectType({
  name: "BookUpdateType",
  description: "book update data",
  fields: {
    name: { type: GraphQLString },
    authorId: { type: GraphQLInt },
    page: { type: GraphQLInt },
  },
});

export const AuthorType = new GraphQLObjectType({
  name: "authorType",
  description: "type authors",
  fields: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
    books: {
      type: GraphQLList(BookTypeInAuthor),
      resolve: (parent) => books.filter((book) => book.authorId === parent.id),
    },
  },
});

export const BookType = new GraphQLObjectType({
  name: "bookType",
  description: "type books",
  fields: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
    page: { type: GraphQLInt },
    // authorId: { type: GraphQLInt },
    author: {
      type: AuthorType,
      resolve: (parent) =>
        authors.find((author) => parent.authorId === author.id),
    },
  },
});
