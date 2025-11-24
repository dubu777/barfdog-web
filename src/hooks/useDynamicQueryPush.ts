import { QueryParams } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { sendLogToNative } from "@/utils/debug/webviewLogger";

export function useDynamicQueryPush() {
  const router = useRouter();
  const currentSearchParams = useSearchParams();

  const pushWithQuery = useCallback(
    (
      path: string,
      newQuery: QueryParams,
      removeQueryKeys?: string[],
      preserveScroll: boolean = false
    ) => {
      sendLogToNative("[useDynamicQueryPush] 시작", { path, newQuery });
      sendLogToNative(
        "[useDynamicQueryPush] 현재 params",
        currentSearchParams.toString()
      );

      // URLSearchParams 객체를 복사하여 사용
      const searchParams = new URLSearchParams(currentSearchParams.toString());

      Object.entries(newQuery).forEach(([key, value]) => {
        searchParams.set(key, String(value));
      });

      if (removeQueryKeys) {
        removeQueryKeys.forEach((key) => searchParams.delete(key));
      }

      const newUrl = `${path}?${searchParams.toString()}`;
      sendLogToNative("[useDynamicQueryPush] 새로운 URL", newUrl);

      router.push(newUrl, { scroll: !preserveScroll });

      sendLogToNative("[useDynamicQueryPush] router.push 호출 완료");
    },
    [router, currentSearchParams]
  );

  return { pushWithQuery };
}
