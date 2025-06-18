"use client";
import { useState, useCallback } from "react";

export interface SkipCondition<K extends string> {
  from: K;
  to: K;
  predicate: () => boolean;
}

export interface UseSurveyStepReturn<K extends string> {
  /** 1-based 현재 단계 번호 */
  currentStep: number;
  /** 현재 단계 키 (예: 'step1') */
  currentStepKey: K;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  direction: number;
}

/**
 * useSurveyStep
 * @template K - 스텝 키 문자열 리터럴 타입
 * @param stepKeys - 순서대로 나열된 스텝 키 배열
 * @param skipConditions - 특정 스텝 간 건너뛰기 룰 배열
 * @returns UseSurveyStepReturn<K>
 */
export function useSurveyStep<K extends string>(
  stepKeys: K[],
  skipConditions: SkipCondition<K>[] = []
): UseSurveyStepReturn<K> {
  const [step, setStep] = useState(1);
  // 이동 방향 상태 (+1 or -1)
  const [direction, setDirection] = useState(0);
  const maxStep = stepKeys.length;

  /**
   * 다음 단계 이동 핸들러
   * - skipConditions 우선 적용
   * - 일반 다음 단계로 이동 (최대 maxStep)
   */
  const handleNextStep = useCallback(() => {
    setDirection(1);
    // 현재 스텝 키 계산 (배열 인덱스: step-1)
    const currentKey = stepKeys[step - 1];
    // 건너뛰기 적용 가능한 조건 찾기
    const skip = skipConditions.find(
      (c) => c.from === currentKey && c.predicate()
    );
    if (skip) {
      // skip.to 단계로 이동
      const targetIndex = stepKeys.indexOf(skip.to);
      if (targetIndex > -1) {
        setStep(targetIndex + 1);
        return;
      }
    }
    // 일반 다음: 현재 +1, 최대값 제한
    setStep((prev) => Math.min(prev + 1, maxStep));
  }, [step, skipConditions, stepKeys, maxStep]);

  // 이전 단계 이동 핸들러
  const handlePrevStep = useCallback(() => {
    setDirection(-1);
    const currentKey = stepKeys[step - 1];
    // 역방향 skip 조건
    const skip = skipConditions.find(
      (c) => c.to === currentKey && c.predicate()
    );
    if (skip) {
      // skip.from 단계로 되돌아가기
      const sourceIndex = stepKeys.indexOf(skip.from);
      if (sourceIndex > -1) {
        setStep(sourceIndex + 1);
        return;
      }
    }
    // 일반 이전
    setStep((prev) => Math.max(prev - 1, 1));
  }, [step, skipConditions, stepKeys]);

  return {
    currentStep: step,
    currentStepKey: stepKeys[step - 1],
    handleNextStep,
    handlePrevStep,
    isFirstStep: step === 1,
    isLastStep: step === maxStep,
    direction,
  };
}
