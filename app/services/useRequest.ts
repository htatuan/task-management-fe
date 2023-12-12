import { gql } from "graphql-request";
import graphQLClient from "./useGraphQL";

export const useRegister = async (
  username: string,
  email: string,
  password: string
): Promise<any> => {
  return await graphQLClient.request(
    gql`
      mutation {
        register(
          registerInput: { username: "${username}", email: "${email}", password: "${password}" }
        ) {
          id,
          username,
          email
        }
      }
    `,
    { username, email, password }
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
          loginInput:{username:"${username}", password:"${password}"}
        ) {
          user{
            id,
            username,
            email
          },
          accessToken
        }
      }
    `,
    { username, password }
  );
};
