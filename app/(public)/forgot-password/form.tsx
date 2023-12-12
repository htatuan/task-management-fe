"use client";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import Link from "next/link";
import { useFormSchema } from "../register/useFormSchema";
import { useForgotPassword } from "@/app/services/useRequest";

const ForgotPasswordForm = () => {
  // const { mutate } = useMutation((variables: { email: string }) =>
  //   useForgotPassword(variables.email)
  // );

  const {
    form: { register, handleSubmit: handleSubmit },
    isError,
    getErrorMessage,
  } = useFormSchema();
  const onSubmitForgotPasswordForm: SubmitHandler<{ email: string }> = (
    dataForm
  ) => {
    console.log(dataForm);
    // mutate(
    //   {
    //     email: dataForm.email,
    //   },
    //   {
    //     onSuccess: () => {
    //       console.log("success");
    //     },
    //     onError: (errors) => {
    //       console.log("error=> ", errors);
    //     },
    //   }
    // );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForgotPasswordForm)}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Enter your Email
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            isError("email") ? "border-red-400" : ""
          }`}
          type="text"
          placeholder="email"
          {...register("email", { required: true })}
        />
        {isError("email") && (
          <span className="text-red-400 text-sm">
            {getErrorMessage("email")}
          </span>
        )}
      </div>
      <div className="flex flex-col w-full gap-1">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
        <div className="flex gap-1 items-center">
          <span className="text-black text-sm">Or go back to</span>
          <Link
            href="/login"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
