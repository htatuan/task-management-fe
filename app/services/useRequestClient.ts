"use client";
import { gql } from "graphql-request";
import callApi from "./useGraphQL";
import { useQuery } from "react-query";

export function useGetAllTask(id: number) {
  return useQuery("getAllTasks", () => {
    const allTasks = callApi().request(gql`
      query {
        data:findAllTasks(ownerId: ${id}) {
          id
          status
          title
        }
      }
    `);
    return allTasks;
  });
}
