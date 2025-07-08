"use client";
import { NONE_VALUE } from "@/constants";
import { GUT_CHECK_OPTIONAL_FIELDS } from "@/constants/healthNote/gutCheck";
import { useCallback } from "react";
import { UseFormReturn, Path } from "react-hook-form";

export interface UseSurveyNavigatorOptions<T extends Record<string, any>> {
  methods: UseFormReturn<T>;
  /** 현재 단계의 최상위 key (예: 'step1') */
  currentStepKey: keyof T;
  /** 다음 단계로 이동시키는 함수 */
  handleNextStep: () => void;
  /** 자동 스텝 제외용 키 집합 */
  noAutoStepSet: Set<keyof T>;
  optionalField: Record<string, string[]>;
}

export interface UseSurveyNavigatorReturn<T> {
  /** 다음 단계 넘어갈 수 있는지 */
  isCanNextStep: () => boolean;
  /** 값 변경 시 자동 검증 및 스킵 */
  handleChange: () => Promise<void>;
  /** 블러 시 필드 단위 검증 후 스킵 */
  handleBlur: (fieldName: Path<T>) => Promise<void>;
  /** 엔터 키 시 검증 후 스킵 */
  handleKeyDown: (e: React.KeyboardEvent, fieldName: Path<T>) => Promise<void>;
}

export function useSurveyNavigator<T extends Record<string, any>>({
  methods,
  currentStepKey,
  handleNextStep,
  noAutoStepSet,
  optionalField,
}: UseSurveyNavigatorOptions<T>): UseSurveyNavigatorReturn<T> {
  const {
    watch,
    trigger,
    formState: { errors },
  } = methods;

  /**
   * 현재 단계의 모든 필드가 채워졌고 에러가 없는지 확인
   */
  const isCanNextStep = useCallback((): boolean => {
    const stepValues = watch(currentStepKey as Path<T>);
    if (!stepValues) return false;

    // 이번 스텝의 옵셔널 필드 목록
    const allowedEmpty = optionalField[currentStepKey as Path<T>] ?? [];

    // 모든 필드가 비어있지 않은지 검사
    const allFilled = Object.entries(stepValues).every(([key, value]) => {
      // optionalEmptyFields에 있으면 항상 통과
      if (allowedEmpty.includes(key)) return true;

      if (typeof value === "string") return value.trim() !== "";
      if (Array.isArray(value)) return value.length > 0;
      return value != null; // boolean, number 등의 경우 null/undefined 체크
    });

    // 현재 스탭에 속한 에러 키가 하나도 없는지 확인
    const hasError = Object.keys(errors).some((path) =>
      path.startsWith(String(currentStepKey))
    );
    return allFilled && !hasError;
  }, [watch, errors, currentStepKey]);

  /**
   * 입력값 변경 시 호출: 해당 스텝 전체 필드 검증하고,
   * noAutoStepSet에 포함되지 않은 경우 자동으로 다음으로 이동
   */
  const handleChange = useCallback(async () => {
    // 현재 스텝 전체 검증
    const valid = await trigger(currentStepKey as Path<T>);
    // 자동 스텝 건너뛰기 금지 단계면 리턴
    if (noAutoStepSet.has(currentStepKey)) return;
    // 유효하고, 다음 단계로 넘어갈 수 있으면 이동
    if (valid && isCanNextStep()) {
      handleNextStep();
    }
  }, [trigger, currentStepKey, noAutoStepSet, isCanNextStep, handleNextStep]);

  /**
   * blur 이벤트 시 호출: 특정 필드만 검증하고,
   * 전체 스텝 유효하면 다음 단계 이동
   */
  const handleBlur = useCallback(
    async (fieldName: Path<T>) => {
      const valid = await trigger(fieldName);
      if (valid && isCanNextStep()) {
        handleNextStep();
      }
    },
    [trigger, isCanNextStep, handleNextStep]
  );

  /**
   * keyDown 이벤트 시 호출: Enter 키에 반응하여 특정 필드 검증 후 이동
   */
  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent, fieldName: Path<T>) => {
      if (e.key === "Enter") {
        const valid = await trigger(fieldName);
        if (valid && isCanNextStep()) {
          handleNextStep();
        }
      }
    },
    [trigger, isCanNextStep, handleNextStep]
  );

  return { isCanNextStep, handleChange, handleBlur, handleKeyDown };
}
