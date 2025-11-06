// src/hooks/checkout/usePendingOrderGuard.ts
import { OrderType } from "@/types";
import { cancelBeacon, listPendingOrder } from "@/utils/checkout/pendingOrder";
import { useEffect } from "react";

type UsePendingOrderGuardOptions = {
  /** "general" | "subscribe" */
  orderType: OrderType;
  /** 정상 환경(마운트 시)에서 취소 API를 호출하는 함수 (예: React Query mutation) */
  cancelMany: (ids: number[]) => Promise<unknown>;
  /** 언로드 시점에 비콘으로 호출할 URL 빌더 */
  buildCancelUrl: (id: number) => string;
  /** 활성화 여부(페이지에 따라 끄고 켤 수 있음) */
  enabled?: boolean;
};

export function usePendingOrderGuard({
  orderType,
  cancelMany,
  buildCancelUrl,
  enabled = true,
}: UsePendingOrderGuardOptions) {
  // 1) 마운트 시 남은 pending 복구(정상 네트워크에서 재시도)
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    const pendings = listPendingOrder(orderType);
    if (pendings.length === 0) return;

    // 한 번에 취소 재시도 (멱등 가정)
    void cancelMany(pendings);
    // 세션 정리는 cancelMany 내부/호출 측에서 처리(서버 결과 보고 판단)
  }, [enabled, orderType, cancelMany]);

  // 2) 언로드/숨김 시 비콘 전송(최후 통신)
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const handleUnloadLike = () => {
      const pendings = listPendingOrder(orderType);
      if (pendings.length === 0) return;
      pendings.forEach((id) => cancelBeacon(buildCancelUrl(id)));
      // 세션을 바로 지우지 않는 이유:
      // - 비콘 실패 가능성 → 다음 마운트 시 재시도
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") handleUnloadLike();
    };

    window.addEventListener("beforeunload", handleUnloadLike);
    window.addEventListener("pagehide", handleUnloadLike);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("beforeunload", handleUnloadLike);
      window.removeEventListener("pagehide", handleUnloadLike);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled, orderType, buildCancelUrl]);
}
