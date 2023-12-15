"use client";
import callApi from "./useGraphQL";
import { gql } from "graphql-request";
import { useSession } from "next-auth/react";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

const useMutationCustom = (
  options: UseMutationOptions,
  fnc: (data: any) => string
) => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (data) => {
      const graphQlStatement = fnc(data);
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

