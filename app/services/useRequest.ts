import { gql } from "graphql-request";
import callApi from "./useGraphQL";
import useQueryCustom from "./useQueryCustom";
import useMutationCustom from "./useMutationCustom";

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

export const useResetPassword = async (
  forgotPasswordToken: string,
  password: string
): Promise<any> => {
  return await callApi().request(
    gql`
      mutation {
        resetPassword(
          resetPasswordInput:{forgotPasswordToken:"${forgotPasswordToken}", password: "${password}"}
        ) {
          message
        }
      }
    `,
    { forgotPasswordToken, password }
  );
};

export const useFetchAllTasks = (
  queryKey: string,
  ...args: (string | number | undefined)[]
) => {
  const queryStatement = `query {
    data: searchTask(keyword: "${args[0]}") {
      id
      status
      title
      createdAt
    }
  }`;
  return useQueryCustom(queryKey, queryStatement, ...args);
};

export const addNewTask = (variables:{title:string, status:string}) => {
  const queryStatement = `mutation {
        createTask(createTaskInput:{
          title: "${variables.title}",
          status: "${variables.status}"
          ownerId: 1
        }
        ) {
          id,
          title,
          status
        }
      }`;

  return useMutationCustom(queryStatement, variables.title, variables.status, 1);
};

export const updateTask = async (id: number, status: string): Promise<any> => {
  return await callApi().request(
    gql`
    mutation {
      updateTask(updateTaskInput:{
        id: ${id},
        status: "${status}"
      }
      ) {
        id,
        title,
        status
      }
    }
    `,
    { id, status }
  );
};

export const deleteTask = async (taskId: number): Promise<any> => {
  return await callApi().request(
    gql`
    mutation {
      data:deleteTask(id:${taskId}) 
    } `,
    { taskId }
  );
};
