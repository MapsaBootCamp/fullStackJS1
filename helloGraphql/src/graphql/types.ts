import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { authors, books } from "../db";
import { Author } from "../models/author";
import { Book } from "../models/book";

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
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    books: {
      type: GraphQLList(BookTypeInAuthor),
      resolve: async (parent) => {
        try {
          return await Book.find({ author: parent.id });
        } catch (error) {
          throw new Error(error);
        }
      },
    },
  },
});

export const BookListType = new GraphQLObjectType({
  name: "BookListType",
  description: "type books in a list",
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    page: { type: GraphQLInt },
    author: {
      type: AuthorType,
    },
  },
});

export const BookType = new GraphQLObjectType({
  name: "bookType",
  description: "type books",
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    page: { type: GraphQLInt },
    // authorId: { type: GraphQLInt },
    author: {
      type: AuthorType,
      resolve: async (parent) => {
        try {
          console.log("author");
          return await Author.findById(parent.author);
        } catch (error) {
          throw new Error(error);
        }
      },
    },
  },
});
