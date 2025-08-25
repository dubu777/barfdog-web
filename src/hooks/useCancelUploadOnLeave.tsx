"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function useCancelUploadOnLeave({
  hasPendingUploads,
  cancelUpload,
  submitted, // 제출 성공 상태
}: {
  hasPendingUploads: boolean;
  cancelUpload: () => void;
  submitted: boolean;
}) {
  const pathname = usePathname();
  const params = useSearchParams();
  const search = useMemo(() => params.toString(), [params]);

  // 최신 값을 참조하기 위한 ref들
  const cancelRef = useRef(cancelUpload);
  const pendingRef = useRef(hasPendingUploads);
  const shouldCancelRef = useRef(!submitted);

  useEffect(() => {
    cancelRef.current = cancelUpload;
  }, [cancelUpload]);
  useEffect(() => {
    pendingRef.current = hasPendingUploads;
  }, [hasPendingUploads]);
  useEffect(() => {
    shouldCancelRef.current = !submitted;
  }, [submitted]);

  // 0) 예전에 동작했던 "무조건 클린업 호출" 패턴을 유지하되,
  //     조건 판단은 최신 ref 값으로 수행
  useEffect(() => {
    return () => {
      if (shouldCancelRef.current && pendingRef.current) {
        cancelRef.current();
      }
    };
  }, []);

  // 1) 경로/쿼리 변경 시 (SPA 내 네비게이션)
  useEffect(() => {
    return () => {
      if (shouldCancelRef.current && pendingRef.current) {
        cancelRef.current();
      }
    };
  }, [pathname, search]);

  // 2) 새로고침/탭 닫기 (언로드 이벤트)
  useEffect(() => {
    const handler = () => {
      if (shouldCancelRef.current && pendingRef.current) {
        cancelRef.current();
      }
    };
    // capture 단계에서 최대한 일찍 받도록
    window.addEventListener("beforeunload", handler, { capture: true });
    window.addEventListener("pagehide", handler, { capture: true });
    // 일부 브라우저 보완
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.visibilityState === "hidden") handler();
      },
      { capture: true }
    );

    return () => {
      window.removeEventListener("beforeunload", handler, {
        capture: true,
      } as any);
      window.removeEventListener("pagehide", handler, { capture: true } as any);
      document.removeEventListener(
        "visibilitychange",
        handler as any,
        { capture: true } as any
      );
    };
  }, []);
}
