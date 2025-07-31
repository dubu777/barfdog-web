"use client";

import { useEffect } from "react";

/**
 * 새로고침·탭 닫기, 뒤로가기, 내부 라우트(push/replace) 이동 시
 * 브라우저 경고창을 띄워서 페이지 이탈을 막는 훅
 */

interface useNavigationGuardProps {
  shouldBlock: boolean;
}

export function useNavigationGuard({ shouldBlock }: useNavigationGuardProps) {
  useEffect(() => {
    if (!shouldBlock) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [shouldBlock]);
}
