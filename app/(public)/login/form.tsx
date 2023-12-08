"use client";
import React, { FormEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import Link from "next/link";

const LoginForm = () => {
  const [enabled, setEnabled] = useState(false);
  const API_URL = `http://localhost:3000/graphql`;

  const graphQLClient = new GraphQLClient(API_URL, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaHR1YW4iLCJpYXQiOjE3MDE5NDIyMzksImV4cCI6MTcwMTk0NTgzOX0.UmRLkw-Il63rKUNJdwthyiSv3Z4N5slImW1Xt6eYblU`,
    },
  });

  const UserQuery = gql`
    query {
      findAllTasks(ownerId: 1) {
        id
        title
        status
        ownerId
      }
    }
  `;

  const fetchUser = async () => {
    return await graphQLClient.request(UserQuery);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputLoginForm>();

  const test = () => {
    const { isLoading, data } = useQuery(["get-user"], fetchUser,{ enabled: false });
    console.log("data => ", data);

    return data;
  };

  const { isLoading, data } = useQuery(["get-user"], fetchUser,{
    enabled: enabled
  });
  console.log("data333333 => ", data);
  const onSubmitLoginForm: SubmitHandler<InputLoginForm> = (dataForm) => {
    console.log(dataForm);
    //setEnabled(true)
    const { isLoading, data } = useMutation(["get-user"], fetchUser);
    console.log("data => ", data);
    // const { isLoading, data } = useQuery(["login"], async () => {
    //   return await graphQLClient.request(
    //     gql`
    //       query {
    //         login(username: $username, password: $password) {
    //           username
    //           accessToken
    //         }
    //       }
    //     `
    //   );
    // });
    // const data = test();
    // console.log("data => ", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitLoginForm)}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <p className="text-red-500 text-xs italic">
            Please choose a username.
          </p>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
        <Link href="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Register</Link>
      </div>
    </form>
  );
};

export default LoginForm;
