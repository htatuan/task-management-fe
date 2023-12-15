"use client";
import callApi from "./useGraphQL";
import { gql } from "graphql-request";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

export default function useQueryCustom(
  queryKey: string,
  queryStatement: string,
  ...args: (string | number | undefined)[]
) {
  const { data: session } = useSession();
  console.log("see in useQueryCustom=> ", session);

  const { isPending, isError, data, error } = useQuery({
    queryKey: [queryKey, ...args],
    queryFn: async () => {
      const data = await callApi(session?.user.accessToken).request(
        gql`
          ${queryStatement}
        `
      );
      return data;
    },
  });

  return { isPending, isError, data, error };
}
