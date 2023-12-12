import { GraphQLClient } from "graphql-request";

const API_URL = `http://localhost:3000/graphql`;

const headers = {};
const callApi = () => {
  const graphQLClient = new GraphQLClient(API_URL, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaHR1YW4iLCJzdWIiOjEsImlhdCI6MTcwMjM3MDc1MCwiZXhwIjoxNzAyNDA3MTUwfQ.nXDlVM0MyRHgNbQDNQbR-upHJDCr4-QxLCDMAQrfg9k`,
    },
  });

  return graphQLClient;
};

export default callApi;
