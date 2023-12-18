import * as yup from "yup";
import { FieldError, UseFormReturn, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type SearchFormFields = "keyword";

const isError =
  (form: UseFormReturn<SearchInputForm>) =>
  (field: SearchFormFields): boolean | undefined => {
    return !!form.formState.errors[field];
  };

const getErrorMessage =
  (form: UseFormReturn<SearchInputForm>) =>
  (field: SearchFormFields): string | undefined => {
    if ((form.formState.errors[field] as unknown as FieldError[])?.length) {
      return (form.formState.errors[field] as unknown as FieldError[])
        .map((error) => error.message)
        .join("\n");
    }
    return (form.formState.errors[field] as FieldError)?.message;
  };

export function useFormSchema() {
  const formSchema: yup.ObjectSchema<SearchInputForm> = yup.object({
    keyword: yup.string(),
  });

  const form = useForm<SearchInputForm>({
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
