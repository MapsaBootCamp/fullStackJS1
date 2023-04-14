import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { addBook, editBook } from "./mutation";
import { booksQuery, bookQuery, authorsQuery } from "./query";

const rootQuery = new GraphQLObjectType({
  name: "Query",
  description: "all query types",
  fields: {
    books: booksQuery,
    book: bookQuery,
    authors: authorsQuery,
  },
});

const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "all mutation types",
  fields: {
    addBook,
    editBook,
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

export default schema;
