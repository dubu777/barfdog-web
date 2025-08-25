"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type CancelFn = (keepalive?: boolean) => void | Promise<void>;

export function useCancelUploadOnLeave({
  hasPendingUploads,
  cancelUpload,
  submitted, // 제출 성공 상태
}: {
  hasPendingUploads: boolean;
  cancelUpload: CancelFn;
  submitted: boolean;
}) {
  const pathname = usePathname();
  const params = useSearchParams();
  const search = useMemo(() => params.toString(), [params]);

  // 최신 값 ref
  const cancelRef = useRef<CancelFn>(cancelUpload);
  const pendingRef = useRef<boolean>(hasPendingUploads);
  const shouldCancelRef = useRef<boolean>(!submitted);
  const firedRef = useRef(false); // 언로드 이벤트 중복 방지

  useEffect(() => {
    cancelRef.current = cancelUpload;
  }, [cancelUpload]);
  useEffect(() => {
    pendingRef.current = hasPendingUploads;
  }, [hasPendingUploads]);
  useEffect(() => {
    shouldCancelRef.current = !submitted;
  }, [submitted]);

  // 공통 실행 함수
  const fire = () => {
    if (firedRef.current) return;
    firedRef.current = true;
    if (shouldCancelRef.current && pendingRef.current) {
      // ⬇️ 언로드 계열 이벤트에서는 반드시 keepalive로!
      cancelRef.current(true);
    }
  };

  // 0) 컴포넌트 언마운트(정상 네비게이션 등) – 일반 호출
  useEffect(() => {
    return () => {
      if (shouldCancelRef.current && pendingRef.current) {
        cancelRef.current(); // keepalive 불필요
      }
    };
  }, []);

  // 1) SPA 경로/쿼리 변경 – 일반 호출
  useEffect(() => {
    return () => {
      if (shouldCancelRef.current && pendingRef.current) {
        cancelRef.current(); // keepalive 불필요
      }
    };
  }, [pathname, search]);

  // 2) 새로고침/탭 닫기/백그라운드 전환 – keepalive 호출
  useEffect(() => {
    const onBeforeUnload = fire;
    const onPageHide = fire;
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") fire();
    };

    window.addEventListener("beforeunload", onBeforeUnload, { capture: true });
    window.addEventListener("pagehide", onPageHide, { capture: true });
    document.addEventListener("visibilitychange", onVisibilityChange, {
      capture: true,
    });

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload, {
        capture: true,
      } as any);
      window.removeEventListener("pagehide", onPageHide, {
        capture: true,
      } as any);
      document.removeEventListener("visibilitychange", onVisibilityChange, {
        capture: true,
      } as any);
    };
  }, []);
}
