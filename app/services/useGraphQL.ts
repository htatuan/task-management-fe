import { GraphQLClient } from "graphql-request";

const API_URL = `http://localhost:3000/graphql`;

const headers = {};
const callApi = () => {
  const graphQLClient = new GraphQLClient(API_URL, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaHR1YW4iLCJpYXQiOjE3MDIzNDc3NzAsImV4cCI6MTcwMjM4NDE3MH0.z1pkb2U6hVsadqun7OGXoyhTDSORgQA8xD318VHwKMo`
      }
    // headers,
  });

  return graphQLClient;
};

export default callApi;
