import { yupResolver } from "@hookform/resolvers/yup";
import { DefaultValues, FieldValues, Resolver, useForm } from "react-hook-form";
import * as yup from "yup";

export function useOrderForm<T extends FieldValues>(
  schema: yup.ObjectSchema<T>,
  defaultValues: DefaultValues<T>
) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm<T>({
    resolver: yupResolver(schema) as unknown as Resolver<T>,
    defaultValues,
    mode: "all",
  });

  return {
    register,
    control,
    handleSubmit,
    errors,
    isValid,
    reset,
    watch,
    setValue,
    trigger,
  };
}
