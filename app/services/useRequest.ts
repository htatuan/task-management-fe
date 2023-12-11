import { gql } from "graphql-request";
import graphQLClient from "./useGraphQL";

export const useRegister = async (
  username: string,
  password: string
): Promise<any> => {
  return await graphQLClient.request(
    gql`
      mutation {
        register(
          createUserInput: { username: "${username}", password: "${password}" }
        ) {
          username
        }
      }
    `,
    { username, password }
  );
};

export const useLogin = async (
  username: string,
  password: string
): Promise<any> => {
  return await graphQLClient.request(
    gql`
      mutation {
        login(
          credentials:{username:"${username}", password:"${password}"}
        ) {
          username,
          accessToken
        }
      }
    `,
    { username, password }
  );
};