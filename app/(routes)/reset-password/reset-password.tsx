"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useResetPassword } from "../../services/useRequest";
import { useRouter } from "next/navigation";

const formSchema: any = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long!"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long!"),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must need to match!",
      path: ["confirmPassword"],
    }
  );

type ResetPasswordSchema = z.infer<typeof formSchema>;

const ResetPassword = ({
  forgotPasswordToken,
}: {
  forgotPasswordToken: string;
}) => {
  const { mutate, isLoading } = useMutation(
    (variables: { forgotPasswordToken: string; password: string }) =>
      useResetPassword(variables.forgotPasswordToken, variables.password)
  );
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(formSchema),
  });
  const [show, setShow] = useState(false);
  const [confirmPasswordshow, setconfirmPasswordshow] = useState(false);

  const onSubmit = async (data: ResetPasswordSchema): Promise<void> => {
    try {
      mutate(
        {
          forgotPasswordToken: forgotPasswordToken,
          password: data.password,
        },
        {
          onSuccess: () => {
            toast.success("Password updated successfully!", {
              position: toast.POSITION.TOP_CENTER,
            });
            push("/login");
          },
          onError: (errors) => {
            console.log("error=> ", errors);
          },
        }
      );
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="md:w-[500px] w-full flex flex-col gap-1 items-center text-black">
        <h1 className={" font-bold text-3xl"}>Reset Your Password</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
        >
          <div className="w-full mt-5 relative mb-1 flex flex-col gap-2">
            <label htmlFor="password" className={"font-semibold"}>
              Enter your password
            </label>
            <input
              {...register("password")}
              type={!show ? "password" : "text"}
              placeholder="password!@%"
              className={"border p-2 rounded-md"}
            />
            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
          </div>
          {errors.password && (
            <span className="text-red-500">{`${errors.password.message}`}</span>
          )}
          <div className="w-full mt-5 relative mb-1 flex flex-col gap-2">
            <label htmlFor="confirmPassword" className={"font-semibold"}>
              Enter your confirm password
            </label>
            <input
              {...register("confirmPassword")}
              type={!confirmPasswordshow ? "password" : "text"}
              placeholder="password!@%"
              className={"border p-2 rounded-md"}
            />
            {!confirmPasswordshow ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setconfirmPasswordshow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setconfirmPasswordshow(false)}
              />
            )}
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500">{`${errors.confirmPassword.message}`}</span>
          )}
          <div className={"flex w-full items-center justify-around"}>
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={"rounded-md border p-2 bg-blue-500 text-white mt-5"}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
