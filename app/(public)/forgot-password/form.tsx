"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useForgotPassword } from "@/app/services/useRequest";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatErrorResponse } from "@/app/utils/format-error";
import { useMutation } from "@tanstack/react-query";

const emailSchema: any = z.object({
  email: z.string().email(),
});

const ForgotPasswordForm = () => {

  const mutation = useMutation({
    mutationFn: (data: { email: string }) => useForgotPassword(data.email),
    onError: (error, variables, context) => {
      console.log("error=> ", error);
      toast.error(formatErrorResponse(error).message);
    },
    onSuccess: (data, variables, context) => {
      toast.success(
        "Your forgot password request has been sent to your email!",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(emailSchema),
  });
  const onSubmitForgotPasswordForm: SubmitHandler<{ email: string }> = (
    dataForm
  ) => {
    mutation.mutate({
      email: dataForm.email,
    });
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
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="text"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">{`${errors.email.message}`}</p>
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
