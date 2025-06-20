import { useCallback } from "react";
import { NONE_VALUE } from "@/constants";

/**
 * 설문용 토글 모드
 * - "radio": 단일 선택. 이미 선택된 값은 해제 불가.
 * - "selectionBox": 단일 선택. 선택 상태를 다시 클릭하면 해제됨.
 * - "checkbox": 다중 선택. "NONE" 선택 시 [NONE_VALUE]만 남도록 함.
 */
export type SurveyToggleMode = "radio" | "checkbox" | "selectionBox";

/**
 * useSurveyToggleOption
 *
 * @param selectedValue - 현재 선택된 값 (단일 값 또는 배열)
 * @param mode - 토글 모드 ("radio", "checkbox", "selectionBox")
 * @param onChange - 선택값이 변경될 때 호출하는 콜백
 * @param maxSelectionCount - (checkbox 모드 전용) 최대 선택 가능 개수를 지정하는 옵셔널 파라미터.
 *
 * @returns { onToggle, isSelected }
 *    onToggle: 주어진 값에 대해 토글 동작을 수행합니다.
 *    isSelected: 주어진 값이 선택되었는지 여부를 boolean으로 반환합니다.
 */

interface UseSurveyToggleOptionProps<T> {
  /** 현재 선택된 값 (단일 혹은 배열, 혹은 null) */
  selectedValue: T | T[] | null;
  /** 토글 모드 */
  mode: SurveyToggleMode;
  /** 값 변경 콜백 */
  onChange: (value: T | T[] | null) => void;
  /** (checkbox 전용) 최대 선택 개수 */
  maxSelectionCount?: number;
}

export function useSurveyToggleOption<T>({
  selectedValue,
  mode,
  onChange,
  maxSelectionCount,
}: UseSurveyToggleOptionProps<T>) {
  const onToggle = useCallback(
    (value: T) => {
      if (mode === "radio") {
        // radio 모드: 단순히 선택한 값으로 변경 (해제 불가)
        onChange(value);
      } else if (mode === "selectionBox") {
        // selectionBox 모드: radio와 유사하지만, 선택된 값이 다시 클릭되면 해제됨
        if (selectedValue === value) {
          onChange(null);
        } else {
          onChange(value);
        }
      } else if (mode === "checkbox") {
        // checkbox 모드: 다중 선택 로직
        if (Array.isArray(selectedValue)) {
          if (value === NONE_VALUE) {
            // "NONE" 선택 시, 다른 모든 값 제거 후 오직 [NONE_VALUE]만 선택
            onChange([NONE_VALUE as T]);
          } else {
            // 현재 선택 배열에 NONE_VALUE가 있다면 먼저 제거
            const currentSelection = selectedValue.includes(NONE_VALUE as T)
              ? selectedValue.filter((item) => item !== NONE_VALUE)
              : selectedValue;

            if (currentSelection.includes(value)) {
              // 이미 선택된 값이면 제거
              onChange(currentSelection.filter((item) => item !== value));
            } else {
              // 추가하기 전에 최대 선택 개수가 지정되어 있는 경우 체크
              if (
                maxSelectionCount !== undefined &&
                currentSelection.length >= maxSelectionCount
              ) {
                // 최대 개수에 도달했다면 아무것도 추가하지 않음
                return;
              }
              onChange([...currentSelection, value]);
            }
          }
        } else {
          // checkbox 모드인데 배열이 아닌 경우 경우 (예: boolean 전용)
          if (selectedValue === value) {
            onChange(false as T);
          } else {
            onChange(value);
          }
        }
      }
    },
    [selectedValue, mode, onChange, maxSelectionCount]
  );

  /**
   * 주어진 값이 현재 선택된 값인지 여부를 반환
   * - radio/selectionBox 모드: 단일 값 비교
   * - checkbox 모드: 배열에 포함 여부 확인
   */
  const isSelected = useCallback(
    (value: T) => {
      if (mode === "radio" || mode === "selectionBox") {
        return selectedValue === value;
      } else if (mode === "checkbox") {
        if (Array.isArray(selectedValue)) {
          return selectedValue.includes(value);
        } else {
          return selectedValue === value;
        }
      }
      return false;
    },
    [selectedValue, mode]
  );

  return { onToggle, isSelected };
}
