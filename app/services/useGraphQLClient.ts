import { GraphQLClient } from "graphql-request";

const callApi = (accessToken: string | undefined = undefined) => {
  let headers = {};
  if (accessToken) {
    headers = { ...headers, Authorization: `Bearer ${accessToken}` };
  }
  const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL, {
    headers,
  });

  return graphQLClient;
};

export default callApi;
