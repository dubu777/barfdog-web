import { QueryParams } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback } from "react";


const useDynamicQueryPush = () => {
  const router = useRouter();
  const pushWithQuery = useCallback((path: string, newQuery: QueryParams) => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const searchParams = url.searchParams;

    Object.entries(newQuery).forEach(([key, value]) => {
      searchParams.set(key, String(value));
    });

    router.push(`${path}?${searchParams.toString()}`);
  }, [router]);

  return { pushWithQuery };
}
export default useDynamicQueryPush;