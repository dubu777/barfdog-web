export type SearchParamProps = {
  param: { id: string | number };
  searchParams: { [key: string]: string | string[] | undefined }
}
export type DefaultObjectType = {
  name: string | Element;
  value: string | number | Record<string, string | number> | Element;
  visible?: boolean;
  child?: { name: string; value: string }[];
}