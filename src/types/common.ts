import { ReactNode } from "react";

export type SearchParamProps = {
  param: { [key: string]: string | number };
  searchParams: { [key: string]: string | string[] | undefined }
}

export type DefaultObjectType = {
  id: string | number;
  name: string | ReactNode;
  value: string | number | ReactNode;
  visible?: boolean;
  child?: { id: string | number; name: string; value: string; visible?: boolean }[];
}