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
  const isGuardDisabledRef = useRef(false);

  // beforeunload: 새로고침·탭 닫기 시 confirm
  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (!isLeaving && !isGuardDisabledRef.current) {
        e.preventDefault();
      }
    },
    [isLeaving]
  );


  useEffect(() => {
    if (typeof window !== "undefined") {

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [handleBeforeUnload]);

  // 2) 외부에서 네비게이션 가드를 완전 비활성화할 때 호출
  const disableGuard = useCallback(() => {
    if (typeof window === "undefined") return;
    isGuardDisabledRef.current = true;
    window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [handleBeforeUnload]);

  // 사용자가 모달에서 확인 버튼을 눌렀을 때 실행되는 콜백
  const confirmLeaving = useCallback(() => {
    setIsLeaving(true);
    setShowModal(false);

    if (typeof window !== "undefined") {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }
    onConfirm();
  }, [onConfirm, setIsLeaving, setShowModal, handleBeforeUnload]);

  return { confirmLeaving, disableGuard };
}
