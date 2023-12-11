import * as yup from "yup";
import { FieldError, UseFormReturn, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type LoginFormFields = "username" | "password";

const isError =
  (form: UseFormReturn<InputLoginForm>) =>
  (field: LoginFormFields): boolean | undefined => {
    return !!form.formState.errors[field];
  };

const getErrorMessage =
  (form: UseFormReturn<InputLoginForm>) =>
  (field: LoginFormFields): string | undefined => {
    if ((form.formState.errors[field] as unknown as FieldError[])?.length) {
      return (form.formState.errors[field] as unknown as FieldError[])
        .map((error) => error.message)
        .join("\n");
    }
    return (form.formState.errors[field] as FieldError)?.message;
  };

export function useFormSchema() {
  const formSchema: yup.ObjectSchema<InputLoginForm> = yup.object({
    username: yup
      .string()
      .required("Username is required.")
      .min(6, "Username should minimum 6 characters"),
    password: yup
      .string()
      .required("Password is required.")
      .min(8, "Password should minimum 8 characters."),
  });

  const form = useForm<InputLoginForm>({
    reValidateMode: "onChange",
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  return {
    form,
    formSchema,
    isError: isError(form),
    getErrorMessage: getErrorMessage(form),
  };
}
