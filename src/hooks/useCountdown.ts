import { useEffect, useRef, useState } from "react";
import { formatMmSs } from "@/utils/datetime/formatCountdown";

export interface CountdownOptions {
  intervalMs?: number; // 기본 1000ms
  onExpire?: () => void; // 만료 시 1회 콜백
  stopOnExpire?: boolean; // 만료되면 타이머 정지(기본 true)
}

export interface CountdownResult {
  secondsLeft: number;
  isExpired: boolean;
  formatted: string; // 'MM:SS'
}

export function useCountdown(
  targetMs: number | null,
  { intervalMs = 1000, onExpire, stopOnExpire = true }: CountdownOptions = {}
): CountdownResult {
  const [now, setNow] = useState(() => Date.now());
  const timerRef = useRef<number | null>(null);
  const firedRef = useRef(false);

  // target 변경 시 초기화
  useEffect(() => {
    firedRef.current = false;
  }, [targetMs]);

  useEffect(() => {
    if (!targetMs) return;

    // 즉시 1회 동기화
    setNow(Date.now());

    const tick = () => {
      const n = Date.now();
      setNow(n);

      // 만료되면 타이머 정지
      if (stopOnExpire && n >= targetMs && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    timerRef.current = window.setInterval(tick, intervalMs);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [targetMs, intervalMs, stopOnExpire]);

  const diff = (targetMs ?? 0) - now;
  const isExpired = !targetMs || diff <= 0;
  const secondsLeft = Math.max(0, Math.floor(diff / 1000));
  const formatted = formatMmSs(secondsLeft);

  useEffect(() => {
    if (isExpired && !firedRef.current) {
      firedRef.current = true;
      onExpire?.();
    }
  }, [isExpired, onExpire]);

  return { secondsLeft, isExpired, formatted };
}
