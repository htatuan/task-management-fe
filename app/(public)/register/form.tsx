"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { useRegister } from "@/app/services/useRequest";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormSchema } from "./useFormSchema";

export function RegisterForm(): React.ReactElement {
  const { push } = useRouter();
  const { mutate } = useMutation(
    (variables: { username: string; password: string }) =>
      useRegister(variables.username, variables.password)
  );
  
  const {
    form: { formState, register, reset, handleSubmit: handleSubmit },
    isError,
    getErrorMessage,
  } = useFormSchema();
  const onSubmitRegisterForm: SubmitHandler<InputLoginForm> = (dataForm) => {
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
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            isError("username") ? "border-red-400" : ""
          }`}
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
        />
        {isError("username") && (
          <span className="text-red-400 text-sm">
            {getErrorMessage("username")}
          </span>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
            isError("password") ? "border-red-400" : ""
          }`}
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {isError("password") && (
          <span className={"text-red-400 text-sm"}>
            {getErrorMessage("password")}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          disabled={formState.isSubmitting}
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
}
