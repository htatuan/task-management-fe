"use client";
import callApi from "./useGraphQLClient";
import { gql } from "graphql-request";
import { useSession } from "next-auth/react";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

const useMutationCustom = (
  options: UseMutationOptions,
  fnc: (params: any) => string
) => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (variables) => {
      const graphQlStatement: string = fnc(variables);
      await callApi(session?.user.accessToken).request(
        gql`
          ${graphQlStatement}
        `
      );
    },
    ...options,
  });
};

export default useMutationCustom;
