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
// popstate 이벤트 처리: 뒤로가기 버튼 클릭 시 호출됩니다.
const handlePopState = useCallback(() => {
  if (!isLeaving) {
    // 첫 popstate 이벤트는 무시합니다.
    if (!hasIgnoredInitialPop.current) {
      hasIgnoredInitialPop.current = true;
      return;
    }
    // 첫 이벤트 이후부터 모달을 표시합니다.
    setShowModal(true);
  }
}, [isLeaving, setShowModal]);

  useEffect(() => {
    // 페이지 mount 시 guard 상태 추가: 뒤로가기를 감지하기 위함
    window.history.pushState({ guard: true }, "", window.location.href);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      // 컴포넌트 unmount 시 guard 상태가 있으면 제거합니다.
      if (window.history.state && window.history.state.guard) {
        window.history.back();
      }
    };
  }, [handleBeforeUnload, handlePopState]);

  // 사용자가 모달에서 확인 버튼을 눌렀을 때 실행되는 콜백
  const confirmLeaving = useCallback(() => {
    setIsLeaving(true);
    setShowModal(false);

    // 이벤트 리스너 제거
    window.removeEventListener("beforeunload", handleBeforeUnload);
    window.removeEventListener("popstate", handlePopState);

    // guard 상태가 있으면 제거하여 history에서 대체합니다.
    if (window.history.state && window.history.state.guard) {
      window.history.back();
    }
    // 외부에서 전달한 onConfirm (예: router.back() 또는 router.push(fallbackUrl))을 호출합니다.
    onConfirm();
  }, [onConfirm, setIsLeaving, setShowModal, handleBeforeUnload, handlePopState]);

  return { confirmLeaving };
}
