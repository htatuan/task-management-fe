"use client";
import React, { FormEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = `http://localhost:3000/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  // headers: {
  //   Authorization: `Bearer ${process.env.API_KEY}`
  // }
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputLoginForm>();
  const onSubmitRegisterForm: SubmitHandler<InputLoginForm> = (dataForm) => {
    console.log(dataForm);
    // const res = useQuery(["login", dataForm.username, dataForm.password], async () => {
    //   return await graphQLClient.request(
    //     gql`
    //     query{
    //       login(username: $username, password:$password){
    //         username,accessToken
    //       }
    //     }
    //     `
    //   );
    // });

    // console.log("res=> ",res)
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitRegisterForm)}
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
          Register
        </button>
        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Login
        </a>
      </div>
    </form>
  );
};

export default RegisterForm;
