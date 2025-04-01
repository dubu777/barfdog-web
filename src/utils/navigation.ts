import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export const useBackNavigation = (fallbackUrl?: string | undefined, keepPreviousSearchParams: boolean = false) => {
  const router = useRouter();
  const pathname = usePathname();

  // 페이지 이동 시 historyStack 저장
  useEffect(() => {
    const historyStack = JSON.parse(sessionStorage.getItem("historyStack") || "[]");

    // 마지막 경로와 현재 경로가 다르면 추가
    if (historyStack.length === 0 || historyStack[historyStack.length - 1] !== pathname) {
      historyStack.push(pathname);
      sessionStorage.setItem("historyStack", JSON.stringify(historyStack));
    }
  }, [pathname]);

  const goBack = () => {
    // fallbackUrl 이 있을 경우 해당 url 로 이동
    if (fallbackUrl) {
      router.push(fallbackUrl);
      return;
    }
    if (keepPreviousSearchParams) {
      router.back();
    }

    // searchParams 가 있을 경우 뒤로가기시 searchParams 가 포함되지 않은 이전 stack url 로 이동
    const historyStack = JSON.parse(sessionStorage.getItem("historyStack") || "[]");
    while (historyStack.length > 0) {
      const previousPage = historyStack.pop();

      if (previousPage && new URL(previousPage, window.location.origin).pathname !== pathname) {
        sessionStorage.setItem("historyStack", JSON.stringify(historyStack));
        router.push(previousPage);
        return;
      }
    }

    // 히스토리가 없을경우 일반적인 뒤로가기
    router.back();
  };

  return goBack;
};