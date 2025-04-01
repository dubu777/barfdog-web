import { useCallback } from "react";

export type ToggleMode = "radio" | "checkbox" | "selectionBox";

// 오버로드 1: radio 모드 (단일 값)
export function useToggleOption<T>(
  selectedValue: T,
  mode: "radio",
  onChange: (selectedValue: T) => void
): { onToggle: (value: T) => void; isSelected: (value: T) => boolean };

// 오버로드 2: selectionBox 모드 (단일 값, 토글시 해제 가능)
export function useToggleOption<T>(
  selectedValue: T | null,
  mode: "selectionBox",
  onChange: (selectedValue: T | null) => void
): { onToggle: (value: T) => void; isSelected: (value: T) => boolean };

// 오버로드 3: checkbox 모드, 배열 값인 경우
export function useToggleOption<T>(
  selectedValue: T[],
  mode: "checkbox",
  onChange: (selectedValue: T[]) => void
): { onToggle: (value: T) => void; isSelected: (value: T) => boolean };

// 오버로드 4: checkbox 모드, 단일 값인 경우 (boolean 전용)
export function useToggleOption<T extends boolean>(
  selectedValue: T,
  mode: "checkbox",
  onChange: (selectedValue: T) => void
): { onToggle: (value: T) => void; isSelected: (value: T) => boolean };

export function useToggleOption<T>(
  selectedValue: T | T[] | null,
  mode: ToggleMode,
  onChange: (selectedValue: T | T[] | null) => void
) {
  const onToggle = useCallback(
    (value: T) => {
      if (mode === "radio") {
        // radio 모드: 단순히 선택만 변경 (해제 불가)
        onChange(value);
      } else if (mode === "selectionBox") {
        // selectionBox 모드: 이미 선택된 값이면 해제 (null로 설정)
        if (selectedValue === value) {
          onChange(null);
        } else {
          onChange(value);
        }
      } else {
        // checkbox 모드
        if (Array.isArray(selectedValue)) {
          if (selectedValue.includes(value)) {
            onChange(selectedValue.filter((item) => item !== value));
          } else {
            onChange([...selectedValue, value]);
          }
        } else {
          // 단일 값 checkbox 모드 (boolean 전용)
          if (selectedValue === value) {
            onChange(false as T);
          } else {
            onChange(value);
          }
        }
      }
    },
    [selectedValue, mode, onChange]
  );

  const isSelected = useCallback(
    (value: T) => {
      if (mode === "radio" || mode === "selectionBox") {
        return value === selectedValue;
      } else {
        return Array.isArray(selectedValue)
          ? selectedValue.includes(value)
          : selectedValue === value;
      }
    },
    [selectedValue, mode]
  );

  return { onToggle, isSelected };
}
