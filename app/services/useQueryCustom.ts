"use client";
import { useQuery } from "react-query";
import callApi from "./useGraphQL";
import { gql } from "graphql-request";
import { useSession } from "next-auth/react";

export default function useQueryCustom(
  queryKey: string,
  queryStatement: string,
  ...args: (string | number | undefined)[]
) {
  const { data: session } = useSession();
  console.log("see in useQueryCustom=> ", session);

  const { data, isFetching, status, error, refetch } = useQuery(
    [queryKey, ...args],
    async () => {
      const data = await callApi(session?.user.accessToken).request(
        gql`
          ${queryStatement}
        `
      );
      return data;
    },
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 0,
    }
  );

  return { data, isFetching, status, error, refetch };
}
