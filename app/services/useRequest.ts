"use client";
import { gql } from "graphql-request";
import graphQLClient from "./useGraphQL";
import { useQuery } from "react-query";
import { TaskModel } from "../(private)/task/components/task.model";

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

export function useGetAllTask() {
  console.log("1");
  return useQuery("", () => {
    const { allTasks } = graphQLClient.request(gql`
      query {
        findAllTasks(ownerId: 1) {
          id
          status
          title
        }
      }
    `);
    return allTasks;
  });
}
