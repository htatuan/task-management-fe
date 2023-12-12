import { gql } from "graphql-request";
import callApi from "./useGraphQL";

export const useRegister = async (
  username: string,
  email: string,
  password: string
): Promise<any> => {
  return await callApi().request(
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
  console.log("call login");
  return await callApi().request(
    gql`
      mutation {
        login(loginInput: { username: "${username}", password: "${password}" }) {
          user {
            id
            username
            email
          }
          accessToken
        }
      }
    `,
    { username, password }
  );
};

export const useForgotPassword = async (email: string): Promise<any> => {
  return await callApi().request(
    gql`
      mutation {
        forgotPassword(
          forgotPasswordInput:{email:"${email}"}
        ) {
          message
        }
      }
    `,
    { email }
  );
};

export const useFetchAllTasks = async (id: number): Promise<any> => {
  return await callApi().request(
    gql`
    query {
      findAllTasks(ownerId:${id}) {
        id,
        title,
        status,
        ownerId
      }
    }
    `,
    { id }
  );
};

export const addNewTask = async (
  title: string,
  status: string,
  ownerId: number
): Promise<any> => {
  return await callApi().request(
    gql`
    mutation {
      createTask(createTaskInput:{
        title: "${title}",
        status: "${status}",
        ownerId: ${ownerId}
      }
      ) {
        id,
        title,
        status
      }
    }
    `,
    { title, status, ownerId }
  );
};
