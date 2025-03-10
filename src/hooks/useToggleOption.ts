import { useCallback } from "react";

export type ToggleMode = "radio" | "checkbox";

// 오버로드 1: radio 모드 (단일 값)
export function useToggleOption<T>(
  selectedValue: T,
  mode: "radio",
  onChange: (selectedValue: T) => void
): { onToggle: (value: T) => void; isSelected: (value: T) => boolean };

// 오버로드 2: checkbox 모드, 배열 값인 경우
export function useToggleOption<T>(
  selectedValue: T[],
  mode: "checkbox",
  onChange: (selectedValue: T[]) => void
): { onToggle: (value: T) => void; isSelected: (value: T) => boolean };

// 오버로드 3: checkbox 모드, 단일 값인 경우 (boolean 전용)
export function useToggleOption<T extends boolean>(
  selectedValue: T,
  mode: "checkbox",
  onChange: (selectedValue: T) => void
): { onToggle: (value: T) => void; isSelected: (value: T) => boolean };

export function useToggleOption<T>(
  selectedValue: T | T[],
  mode: ToggleMode,
  onChange: (selectedValue: T | T[]) => void
) {
  const onToggle = useCallback(
    (value: T) => {
      if (mode === "radio") {
        onChange(value);
      } else {
        if (Array.isArray(selectedValue)) {
          if (selectedValue.includes(value)) {
            onChange(selectedValue.filter((item) => item !== value));
          } else {
            onChange([...selectedValue, value]);
          }
        } else {
          // 단일 값 checkbox 모드: 이미 선택되어 있으면 false(토글 off), 아니면 true(토글 on)로 설정
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
      if (mode === "radio") {
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
