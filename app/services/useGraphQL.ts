import { GraphQLClient } from "graphql-request";

const API_URL = `http://localhost:3000/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InR1YW5ob2FuZyIsImlhdCI6MTcwMjM0NzM1NywiZXhwIjoxNzAyMzgzNzU3fQ.8lxMhWQftRTDg5aK6tQFIOLqvlDkOzMLzXbokpSV5Ao",
  },
});

export default graphQLClient;
