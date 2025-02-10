import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

export function useFormHandler<T extends FieldValues>(schema: yup.ObjectSchema<any>, defaultValues: DefaultValues<T>) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue
  } = useForm<T>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: 'onChange',
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
  };
}