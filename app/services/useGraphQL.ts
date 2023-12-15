import { GraphQLClient } from "graphql-request";

const API_URL = `http://localhost:3000/graphql`;

const callApi = (accessToken: string | undefined = undefined) => {
  let headers = {};
  if (accessToken) {
    headers = { ...headers, Authorization: `Bearer ${accessToken}` };
  }
  console.log("accessToken=>>>>>>>>>> ",accessToken)
  console.log("headers=>>>>>> ",headers)
  const graphQLClient = new GraphQLClient(API_URL, {
    headers,
  });

  return graphQLClient;
};

export default callApi;
