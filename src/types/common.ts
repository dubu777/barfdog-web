import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

export type { SearchParamProps, DefaultObjectType, UseMutationCustomOptions, UseQueryCustomOptions };

type SearchParamProps = {
  param: { id: string | number };
  searchParams: { [key: string]: string | string[] | undefined };
};
type DefaultObjectType = {
  name: string | Element;
  value: string | number | Record<string, string | number> | Element;
  visible?: boolean;
  child?: { name: string; value: string }[];
};

type UseMutationCustomOptions<TData = unknown, TVariables = unknown, TError = unknown> = Omit<
  UseMutationOptions<TData, TError, TVariables, unknown>,
  "mutationFn"
>;

type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, TypeError, TData, QueryKey>,
  "queryKey"
>;
