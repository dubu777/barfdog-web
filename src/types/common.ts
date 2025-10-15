import { ReactNode } from "react";
import {
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { TextColor, TextType } from "./typography";
import { COUPON_TARGET } from "@/constants";

type SearchParamProps = {
  param: { [key: string]: string | number };
  searchParams: { [key: string]: string | string[] | undefined };
};

interface DefaultObjectType {
  id: string | number;
  name: string | ReactNode;
  value: string | number | ReactNode;
  visible?: boolean;
  child?: {
    id: string | number;
    name: string;
    value: string;
    visible?: boolean;
  }[];
}

type UseMutationCustomOptions<
  TData = unknown,
  TVariables = unknown,
  TError = unknown
> = Omit<UseMutationOptions<TData, TError, TVariables, unknown>, "mutationFn">;

type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, TypeError, TData, QueryKey>,
  "queryKey"
> & {
  keepPreviousData?: boolean;
};

type UseSuspenseQueryCustomOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData
> = Omit<
  UseSuspenseQueryOptions<TQueryFnData, TypeError, TData, QueryKey>,
  "queryKey"
> & {
  keepPreviousData?: boolean;
};

type UseInfiniteQueryCustomOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData
> = Omit<
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

interface Pagination {
  page: number;
  size: number;
  totalPages: number;
  totalCount: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

interface ImageFile {
  id?: number;
  filename: string;
  url: string;
}

interface Option<T> {
  label: string;
  value: T;
}

interface SelectOption<T extends string | number | boolean | null> {
  label: string;
  value: T;
}

interface BaseUploadedFile {
  fileId?: number;
  fileName?: string;
  folder?: string;
  fileStatus?: "PENDING_ADD" | "PENDING_DELETE" | "ADDED";
  displayImageUrl?: { url: string };
}

type UploadedFile<T = unknown> = BaseUploadedFile & T;

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string | null;
  detailMessage: string | null;
  errorCode: string | null;
}

interface FileChangeInfo {
  addFileIdList: number[];
  deleteFileIdList: number[];
}

interface InfoToken {
  text: string; // 줄바꿈은 \n 으로 표기
  type?: TextType; // 이 토큰만의 타이포 (선택)
  color?: TextColor; // 이 토큰만의 색상 (선택)
}

interface InfoTextType {
  tokens: InfoToken[]; // 여러 조각으로 구성
  type?: TextType; // 항목 기본 타이포 (선택)
  color?: TextColor; // 항목 기본 색상 (선택)
}

interface UrlObject {
  url: string;
}

type ValueOfTuple<T extends readonly unknown[]> = T[number];
type DiscountType = "FLAT_RATE" | "FIXED_RATE";
type DiscountUnitType = "%" | "원";
type CouponTarget = keyof typeof COUPON_TARGET;

export type {
  SearchParamProps,
  DefaultObjectType,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
  UseSuspenseQueryCustomOptions,
  UseInfiniteQueryCustomOptions,
  QueryParams,
  Page,
  Pagination,
  ImageFile,
  Option,
  SelectOption,
  UploadedFile,
  ApiResponse,
  FileChangeInfo,
  InfoTextType,
  ValueOfTuple,
  DiscountType,
  DiscountUnitType,
  CouponTarget,
  UrlObject,
};
