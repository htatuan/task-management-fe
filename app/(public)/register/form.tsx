"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { useRegister } from "@/app/services/useRequest";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const { push } = useRouter();
  const { mutate } = useMutation(
    (variables: { username: string; password: string }) =>
      useRegister(variables.username, variables.password)
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputLoginForm>();
  const onSubmitRegisterForm: SubmitHandler<InputLoginForm> = (dataForm) => {
    console.log(dataForm);
    mutate(
      { username: dataForm.username, password: dataForm.password },
      {
        onSuccess: () => {
          console.log("success");
          push("/login");
        },
        onError: (errors) => {
          console.log("error=> ", errors);
        },
      }
    );
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
        <Link
          href="/login"
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
