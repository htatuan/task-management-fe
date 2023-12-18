import { gql } from "graphql-request";
import useQueryCustom from "../hooks/useQueryCustom";
import callApi from "./useGraphQLClient";

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

export const addNewTask = (data: { title: string; status: string }): string => {
  return `mutation {
    createTask(
      createTaskInput: {
        title: "${data.title}"
        status: "${data.status}"
      }
    ) {
      id
      title
      status
    }
  }
`;
};

export const updateTask = (data: { id: number; status: string }): string => {
  return `mutation {
    updateTask(updateTaskInput:{
      id: ${data.id},
      status: "${data.status}"
    }
    ) {
      id,
      title,
      status
    }
  }
`;
};

export const deleteTask = (data: { id: number }): string => {
  return `mutation {
    data:deleteTask(id:${data.id}) 
  }
`;
};
