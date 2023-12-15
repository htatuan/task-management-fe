"use client";
import callApi from "./useGraphQL";
import { gql } from "graphql-request";
import { useSession } from "next-auth/react";
import { useMutation } from "react-query";

const execute = async (token:string|undefined, title: string, status: string): Promise<any> => {
  return await callApi(token).request(
    gql`
    mutation {
      createTask(createTaskInput:{
        title: "${title}",
        status: "${status}"
        ownerId: 1
      }
      ) {
        id,
        title,
        status
      }
    }`,
    { title, status }
  );
};
export default function useMutationCustom(
  queryStatement: string,
  ...args: (string | number | undefined)[]
) {
  const { data: session } = useSession();
  console.log("see in useMutationCustom=> ", session);
  console.log("args => ", args);


  const { mutate, isLoading, error }  = useMutation((variables: { title: string; status: string }) =>
     execute(session?.user.accessToken, variables.title, variables.status)
  );

  return { mutate, isLoading, error };
}
