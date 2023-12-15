"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { formatErrorResponse } from "@/utils/format-error";

const LoginForm = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputLoginForm>();

  const onSubmitLoginForm: SubmitHandler<InputLoginForm> = async (dataForm) => {
    console.log(dataForm);
    const res = await signIn("credentials", {
      redirect: false,
      username: dataForm.username,
      password: dataForm.password,
      callbackUrl,
    });

    console.log("resssssss=> ", res);

    if (!res?.error) {
      push(callbackUrl);
    } else {
      console.log("error=> ", res?.error);
      toast.error("Wrong credentials provided!");
    }
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
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
        <Link
          href="/register"
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Register
        </Link>
      </div>
      <div className="flex items-center justify-between mt-1">
        <Link
          href="/forgot-password"
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Forgot your password?
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
