'use client';

import { useEffect, useCallback, useRef } from "react";

interface UseNavigationGuardOptions {
  onConfirm: () => void;
  isLeaving: boolean;
  setIsLeaving: (value: boolean) => void;
  setShowModal: (value: boolean) => void;
}

export function useNavigationGuard({
  onConfirm,
  isLeaving,
  setIsLeaving,
  setShowModal,
}: UseNavigationGuardOptions) {
  // 첫 popstate 이벤트 무시 여부를 추적하는 ref 변수
  const hasIgnoredInitialPop = useRef(false);

  // beforeunload 이벤트 처리: 페이지를 벗어나려 할 때 경고
  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (!isLeaving) {
        e.preventDefault();
        return "";
      }
    },
    [isLeaving]
  );

  // popstate 이벤트 처리: 브라우저 뒤로가기 버튼 클릭 시 모달 표시
  const handlePopState = useCallback(() => {
    // 클라이언트 환경에서만 window에 접근
    if (typeof window !== "undefined" && (window as any).__disableNavigationGuard) return;

    if (!isLeaving) {
      // 첫 popstate 이벤트는 무시 (의도한 동작)
      if (!hasIgnoredInitialPop.current) {
        hasIgnoredInitialPop.current = true;
        return;
      }
      // 이후부터 모달 표시
      setShowModal(true);
    }
  }, [isLeaving, setShowModal]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 페이지 mount 시 guard 상태 추가
      window.history.pushState({ guard: true }, "", window.location.href);
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("popstate", handlePopState);
        // 컴포넌트 unmount 시 guard 상태가 있으면 제거
        if (window.history.state && window.history.state.guard) {
          window.history.back();
        }
      };
    }
  }, [handleBeforeUnload, handlePopState]);

  // 네비게이션 가드를 비활성화하기 위한 함수
  const disableGuard = useCallback(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      if (window.history.state && window.history.state.guard) {
        window.history.back();
      }
    }
  }, [handleBeforeUnload, handlePopState]);

  // 사용자가 모달에서 확인 버튼을 눌렀을 때 실행되는 콜백
  const confirmLeaving = useCallback(() => {
    setIsLeaving(true);
    setShowModal(false);

    if (typeof window !== "undefined") {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      if (window.history.state && window.history.state.guard) {
        window.history.back();
      }
    }
    onConfirm();
  }, [onConfirm, setIsLeaving, setShowModal, handleBeforeUnload, handlePopState]);

  return { confirmLeaving, disableGuard };
}
