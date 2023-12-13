import { GraphQLClient } from "graphql-request";

const API_URL = `http://localhost:3000/graphql`;

const headers = {};
const callApi = () => {
  const graphQLClient = new GraphQLClient(API_URL, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaHR1YW4iLCJzdWIiOjEsImlhdCI6MTcwMjQzNTQ0MiwiZXhwIjoxNzAyNDcxODQyfQ.A5KDKUwwY9MAzIcbjSPHolEVKBIQn-pkLoV9_Pnvkp4`,
    },
  });

  return graphQLClient;
};

export default callApi;
