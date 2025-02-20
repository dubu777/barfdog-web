import { QueryParams } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useDynamicQueryPush() {
  const router = useRouter();
  const pushWithQuery = useCallback((
    path: string,
    newQuery: QueryParams,
    removeQueryKeys?: string[],
    preserveScroll: boolean = false,
  ) => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const searchParams = url.searchParams;

    Object.entries(newQuery).forEach(([key, value]) => {
      searchParams.set(key, String(value));
    });

    if (removeQueryKeys) {
      removeQueryKeys.forEach(key => searchParams.delete(key));
    }

    router.push(`${path}?${searchParams.toString()}`, { scroll: !preserveScroll });
  }, [router]);

  return { pushWithQuery };
}