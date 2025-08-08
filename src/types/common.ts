import { ReactNode } from "react";
import {
  QueryKey, UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

declare global {
  interface Window {
    IMP?: {
      init: (userCode: string) => void;
      request_pay: <T = unknown>(data: unknown, callback?: (response: T) => void) => void;
    };
  }
}

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
> & {
  keepPreviousData?: boolean;
};

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

interface ImageFile {
  id?: number;
  filename: string;
  url: string;
}

interface Option {
  label: string;
  value: string;
}

interface SelectOption<T extends string | number | boolean | null> {
  label: string;
  value: T;
}

interface BaseUploadedFile {
  fileId: number;
  fileName: string;
  folder: string;
  fileStatus: 'PENDING_ADD' | 'PENDING_DELETE' | 'ADDED';
  displayImageUrl?: { url: string };
}

type UploadedFile<T = unknown> = BaseUploadedFile & T;

export type {
  SearchParamProps,
  DefaultObjectType,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
  UseSuspenseQueryCustomOptions,
  UseInfiniteQueryCustomOptions,
  QueryParams,
  Page,
  ImageFile,
  Option,
  SelectOption,
  UploadedFile,
};