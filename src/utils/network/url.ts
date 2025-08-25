export function getApiBaseUrl() {
  return process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL_PRODUCT!
    : process.env.NEXT_PUBLIC_API_URL_DEV!;
}

export function toAbsoluteUrl(pathOrUrl: string) {
  return /^https?:\/\//.test(pathOrUrl)
    ? pathOrUrl
    : `${getApiBaseUrl()}${pathOrUrl}`;
}
