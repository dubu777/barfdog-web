import { ReactNode } from "react";
import {
  QueryKey, UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

export type {
  SearchParamProps,
  DefaultObjectType,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
  UseSuspenseQueryCustomOptions,
  UseInfiniteQueryCustomOptions,
  QueryParams,
  Page,
};

type SearchParamProps = {
  param: { [key: string]: string | number };
  searchParams: { [key: string]: string | string[] | undefined }
}

interface DefaultObjectType {
  id: string | number;
  name: string | ReactNode;
  value: string | number | ReactNode;
  visible?: boolean;
  child?: { id: string | number; name: string; value: string; visible?: boolean }[];
}

type UseMutationCustomOptions<TData = unknown, TVariables = unknown, TError = unknown> = Omit<
  UseMutationOptions<TData, TError, TVariables, unknown>,
  "mutationFn"
>;

type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, TypeError, TData, QueryKey>,
  "queryKey"
>;

type UseSuspenseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseSuspenseQueryOptions<TQueryFnData, TypeError, TData, QueryKey>,
  "queryKey"
> & {
  keepPreviousData?: boolean;
};

type UseInfiniteQueryCustomOptions<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData> = Omit<
  UseInfiniteQueryOptions<TQueryFnData, TError, TData, QueryKey>,
  "queryKey" | "queryFn"
>;

type QueryParams = Record<string, string | number | boolean>;

interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}