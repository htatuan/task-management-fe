import { GraphQLClient } from "graphql-request";

const API_URL = `http://localhost:3000/graphql`;

const headers = {}
const graphQLClient = new GraphQLClient(API_URL, {
  //   headers: {
  //     Authorization: `Bearer ${process.env.API_KEY}`
  //   }
  headers
});

export default graphQLClient;