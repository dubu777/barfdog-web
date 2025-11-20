import { QueryParams } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useDynamicQueryPush() {
  const router = useRouter();
  const currentSearchParams = useSearchParams();

  const pushWithQuery = useCallback((
    path: string,
    newQuery: QueryParams,
    removeQueryKeys?: string[],
    preserveScroll: boolean = false,
  ) => {
    // URLSearchParams 객체를 복사하여 사용
    const searchParams = new URLSearchParams(currentSearchParams.toString());

    Object.entries(newQuery).forEach(([key, value]) => {
      searchParams.set(key, String(value));
    });

    if (removeQueryKeys) {
      removeQueryKeys.forEach(key => searchParams.delete(key));
    }

    router.push(`${path}?${searchParams.toString()}`, { scroll: !preserveScroll });
  }, [router, currentSearchParams]);

  return { pushWithQuery };
}