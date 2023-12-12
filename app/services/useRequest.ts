"use client";
import { gql } from "graphql-request";
import callApi from "./useGraphQL";
import { useQuery } from "react-query";

export const useRegister = async (
  username: string,
  password: string
): Promise<any> => {
  return await callApi().request(
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
  return await callApi().request(
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

export function useGetAllTask(id: number) {
  return useQuery("getAllTasks", () => {
    const allTasks = callApi().request(gql`
      query {
        findAllTasks(ownerId: ${id}) {
          id
          status
          title
        }
      }
    `);
    return allTasks;
  });
}
