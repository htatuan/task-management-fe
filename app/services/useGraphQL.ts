import { GraphQLClient } from "graphql-request";

const API_URL = `http://localhost:3000/graphql`;

const headers = {};
const callApi = () => {
  const graphQLClient = new GraphQLClient(API_URL, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhb25naGllbSIsInN1YiI6MSwiaWF0IjoxNzAyMzY2NTUzLCJleHAiOjE3MDI0MjY1NTN9.pbRCShnvmdPWXPe69lS5HZ0Iq-xtQfbgMSwUC5TVJYo`,
    },
  });

  return graphQLClient;
};

export default callApi;
