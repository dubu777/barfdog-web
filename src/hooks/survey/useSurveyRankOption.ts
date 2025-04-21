import { useCallback } from "react";

/**
 * 순위 선택 전용 훅
 * - 최대 3개까지 선택
 * - 선택 순서를 배열로 관리
 * - 재선택(onReselect) 시 모두 초기화
 * - 중간 순위 다시 선택 시 뒤의 순위가 한 칸씩 당겨짐
 */
export function useSurveyRankOption<T>(
  selected: T[],
  onChange: (newRanks: T[]) => void,
  maxRanks = 3
) {
  const onToggle = useCallback(
    (value: T) => {
      const idx = selected.indexOf(value);
      let next: T[];

      if (idx !== -1) {
        // 이미 선택된 순위 해제 → 해당 항목 제거, 뒤 순위 당기기
        next = selected.filter((v) => v !== value);
      } else {
        // 신규 선택
        if (selected.length >= maxRanks) {
          // 이미 3개라 더 이상 선택 불가
          return;
        }
        next = [...selected, value];
      }

      onChange(next);
    },
    [selected, onChange, maxRanks]
  );

  const isDisabled = useCallback(
    (value: T) => {
      // 비선택 상태이고 이미 maxRanks개 선택된 경우
      return selected.length >= maxRanks && !selected.includes(value);
    },
    [selected, maxRanks]
  );

  const getRank = useCallback(
    (value: T) => {
      const idx = selected.indexOf(value);
      return idx === -1 ? undefined : idx + 1;
    },
    [selected]
  );

  const onReselect = useCallback(() => {
    onChange([]);
  }, [onChange]);

  return { onToggle, isDisabled, getRank, onReselect };
}