"use client";

import { useEffect, useRef } from "react";

/**
 * 새로고침·탭 닫기, 뒤로가기, 내부 라우트(push/replace) 이동 시
 * 브라우저 경고창을 띄워서 페이지 이탈을 막는 훅
 */

interface useNavigationGuardProps {
  shouldBlock: boolean;
}

export function useNavigationGuard({ shouldBlock }: useNavigationGuardProps) {
  const isGuardDisabledRef = useRef(false);

  useEffect(() => {
    if (!shouldBlock) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isGuardDisabledRef.current) return;
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // 전역 함수로 비활성화 로직 노출
    (window as any).__disableNavigationGuard = () => {
      isGuardDisabledRef.current = true;
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      delete (window as any).__disableNavigationGuard;
    };
  }, []);
}
