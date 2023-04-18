import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { addAuthor, addBook, editBook } from "./mutation";
import { booksQuery, bookQuery, authorsQuery, authorQuery } from "./query";

const rootQuery = new GraphQLObjectType({
  name: "Query",
  description: "all query types",
  fields: {
    books: booksQuery,
    book: bookQuery,
    authors: authorsQuery,
    author: authorQuery,
  },
});

const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "all mutation types",
  fields: {
    addBook,
    editBook,
    addAuthor,
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

export default schema;
