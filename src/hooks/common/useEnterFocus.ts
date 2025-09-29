// hooks/useEnterFocusOrSubmit.ts
import { KeyboardEvent, useCallback, useMemo } from "react";
import {
  FieldPath,
  FieldValues,
  UseFormGetFieldState,
  UseFormSetFocus,
  UseFormTrigger,
} from "react-hook-form";

interface UseEnterFocusOrSubmitOptions<T extends FieldValues> {
  /** 포커스 이동 순서 */
  fieldNames: FieldPath<T>[];
  /** RHF setFocus */
  setFocus: UseFormSetFocus<T>;
  /** RHF getFieldState (최신 에러 조회용) */
  getFieldState: UseFormGetFieldState<T>;
  /** 이동/제출 전 현재 필드 검증 */
  trigger?: UseFormTrigger<T>;
  /** 공백만 입력된 경우 이동/제출 막기 */
  trimValue?: boolean;
  /** 마지막 필드에서 Enter 시 호출할 제출 함수 */
  submitCurrentForm?: () => void;
}

/**
 * Enter 입력시 다음 필드로 포커스하고,
 * 마지막 필드에서는 제출.
 */
export function useEnterFocus<T extends FieldValues>({
  fieldNames,
  setFocus,
  getFieldState,
  trigger,
  trimValue = true,
  submitCurrentForm,
}: UseEnterFocusOrSubmitOptions<T>) {
  // name -> 다음 name 매핑
  const nextFieldMap = useMemo(() => {
    const map = new Map<FieldPath<T>, FieldPath<T> | undefined>();
    fieldNames.forEach((name, i) => map.set(name, fieldNames[i + 1]));
    return map;
  }, [fieldNames]);

  /** 특정 필드에 바인딩할 onKeyUp 핸들러 생성 */
  const bind = useCallback(
    (fieldName: FieldPath<T>) =>
      async (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key !== "Enter") return;

        const raw = (e.currentTarget.value ?? "") as string;
        const value = trimValue ? raw.trim() : raw;

        // 현재 필드 검증
        if (trigger) {
          const ok = await trigger(fieldName);
          if (!ok) return;
        }

        const { error } = getFieldState(fieldName);
        if (!value || error) return;

        const next = nextFieldMap.get(fieldName);

        if (next) {
          // 다음 필드로 포커스
          e.preventDefault();
          setFocus(next);
          return;
        }

        // 마지막 필드
        if (submitCurrentForm) {
          e.preventDefault();
          submitCurrentForm();
        } else {
          e.preventDefault();
        }
      },
    [
      getFieldState,
      nextFieldMap,
      setFocus,
      submitCurrentForm,
      trigger,
      trimValue,
    ]
  );

  return { bind };
}
