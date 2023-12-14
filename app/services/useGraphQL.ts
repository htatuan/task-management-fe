import { GraphQLClient } from "graphql-request";

const API_URL = `http://localhost:3000/graphql`;

const headers = {};
const callApi = () => {
  const graphQLClient = new GraphQLClient(API_URL, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaHR1YW4iLCJzdWIiOjEsImlhdCI6MTcwMjUyMTQxNywiZXhwIjoxNzAyNTU3ODE3fQ.q9sfitHg0v1TluYvP6FERkh46M-7KNslmdvqEoX1gMk`,
    },
  });

  return graphQLClient;
};

export default callApi;
