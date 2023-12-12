import * as yup from "yup";
import { FieldError, UseFormReturn, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type RegisterFormFields = "username" | "email" | "password";

const isError =
  (form: UseFormReturn<InputRegisterForm>) =>
  (field: RegisterFormFields): boolean | undefined => {
    return !!form.formState.errors[field];
  };

const getErrorMessage =
  (form: UseFormReturn<InputRegisterForm>) =>
  (field: RegisterFormFields): string | undefined => {
    if ((form.formState.errors[field] as unknown as FieldError[])?.length) {
      return (form.formState.errors[field] as unknown as FieldError[])
        .map((error) => error.message)
        .join("\n");
    }
    return (form.formState.errors[field] as FieldError)?.message;
  };

export function useFormSchema() {
  const formSchema: yup.ObjectSchema<InputRegisterForm> = yup.object({
    username: yup
      .string()
      .required("Username is required.")
      .min(6, "Username should minimum 6 characters"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Mail is required"),
    password: yup
      .string()
      .required("Password is required.")
      .min(8, "Password should minimum 8 characters."),
  });

  const form = useForm<InputRegisterForm>({
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
