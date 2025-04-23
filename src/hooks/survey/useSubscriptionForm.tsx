import { DefaultValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";



export function useSubscriptionForm<S extends yup.ObjectSchema<any>>(
  schema: S,
  defaultValues: DefaultValues<yup.InferType<S>>,
) {
  const methods = useForm<yup.InferType<S>>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "all",
  });
  
  return {
    ...methods,
  };
}
