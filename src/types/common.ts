export type SearchParamProps = {
  param: { id: string | number };
  searchParams: { [key: string]: string | string[] | undefined }
}
export type DefaultObjectType = {
  name: string;
  value: string | number;
  child?: { name: string; value: string }[];
}