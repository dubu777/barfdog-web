import { useEffect, useMemo, useRef, useState } from "react";
import { formatMmSs } from "@/utils/datetime/formatCountdown";

export interface CountdownOptions {
  intervalMs?: number; // 기본 1000ms
  enabled?: boolean; // 카운드다운 여부 (기본 true)
  onExpire?: () => void; // 만료 시 1회 콜백
  stopOnExpire?: boolean; // 만료되면 타이머 정지(기본 true)
  skewBufferMs?: number; // 시계 오차 버퍼(기본 2000ms)
}

export interface CountdownResult {
  secondsLeft: number;
  isExpired: boolean;
  formatted: string; // 'MM:SS'
}

export function useCountdown(
  targetMs: number | null,
  {
    intervalMs = 1000,
    enabled = true,
    onExpire,
    stopOnExpire = true,
    skewBufferMs = 2000,
  }: CountdownOptions = {}
): CountdownResult {
  const [now, setNow] = useState(() => Date.now());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const firedRef = useRef(false);

  // 유효성 검사 + 버퍼 적용
  const validTargetMs = useMemo(() => {
    if (!enabled) return null;
    if (typeof targetMs !== "number" || !Number.isFinite(targetMs)) return null;
    // 버퍼: 지금 시각 + 2초 이하면 즉시만료로 취급하지 않고 "미시작"
    if (targetMs <= Date.now() + skewBufferMs) return null;
    return targetMs;
  }, [enabled, targetMs, skewBufferMs]);

  // target 변경 시 만료 이벤트 재활성
  useEffect(() => {
    firedRef.current = false;
  }, [validTargetMs]);

  // 타이머
  useEffect(() => {
    if (!validTargetMs) return;

    // 즉시 1회 동기화(렌더 직후 잔여시간 갱신)
    setNow(Date.now());

    const tick = () => {
      const n = Date.now();
      setNow(n);
      if (stopOnExpire && n >= validTargetMs && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    timerRef.current = setInterval(tick, intervalMs);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [validTargetMs, intervalMs, stopOnExpire]);

  // 계산부
  const diff = validTargetMs ? validTargetMs - now : 0;
  const isExpired = Boolean(validTargetMs && diff <= 0);
  const secondsLeft = Math.max(0, Math.floor(diff / 1000));
  const formatted = formatMmSs(secondsLeft);

  // 만료 콜백 (유효한 타깃이 있을 때만)
  useEffect(() => {
    if (!validTargetMs) return;
    if (isExpired && !firedRef.current) {
      firedRef.current = true;
      onExpire?.();
    }
  }, [isExpired, onExpire, validTargetMs]);

  return { secondsLeft, isExpired, formatted };
}
