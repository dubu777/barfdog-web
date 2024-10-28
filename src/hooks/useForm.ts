"use client";

import { surveyValidation } from "@/utils";
import { SurveyFormData } from "@/types/survey";
import { useSurveyStore } from "@/store/useSurveyStore";
import { useEffect } from "react";

export default function useForm(
  handleNextStep: () => void,
  currentStep: number
) {
  const {
    formData,
    errorMessages,
    updateFormData,
    updateErrorMessages,
    setCanNextStep,
    hasErrorMessages,
  } = useSurveyStore();

  // number 로 들어오는 current step 가공
  const convertNumberToStepKey = (stepNumber: number): string => {
    return `step${stepNumber}`;
  };
  const stepKey = convertNumberToStepKey(currentStep);

  useEffect(() => {
    if (!hasErrorMessages(stepKey)) {
      setCanNextStep(true);
    } else {
      setCanNextStep(false);
    }
  }, [hasErrorMessages(stepKey), setCanNextStep, stepKey]);

  // 폼 값 변경 처리 함수
  const handleChange = (
    key: keyof SurveyFormData,
    value: SurveyFormData[keyof SurveyFormData],
    isMultiSelect = false
  ) => {
    handleTryCatch(() => {
      surveyValidation[key](value);
      updateFormData(key, value, isMultiSelect);
      updateErrorMessages(stepKey, key as string, null);
    }, key);
    if (
      (key === "supplement" || key === "inedibleFood" || key === "caution") &&
      value === "NONE"
    ) {
      handleNextStep();
    }

    if (
      key !== "name" &&
      key !== "weight" &&
      !isMultiSelect &&
      !hasErrorMessages(stepKey)
    ) {
      handleNextStep();
    } else if (
      key !== "name" &&
      key !== "weight" &&
      isMultiSelect &&
      !hasErrorMessages(stepKey)
    ) {
      setCanNextStep(true);
    }
  };

  // 블러 이벤트 처리
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    key: keyof SurveyFormData
  ) => {
    const value = e.target.value;
    handleTryCatch(() => {
      surveyValidation[key](value);
    }, key);

    if (!hasErrorMessages(stepKey)) {
      handleNextStep();
    }
  };

  // 엔터 키 입력 시 처리
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    key: keyof SurveyFormData
  ) => {
    const value = e.currentTarget.value;
    if (e.key === "Enter") {
      handleTryCatch(() => {
        surveyValidation[key](value);
      }, key);

      if (!hasErrorMessages(stepKey)) {
        handleNextStep();
      }
    }
  };

  const handleTryCatch = (funcs: () => void, key: keyof SurveyFormData) => {
    try {
      funcs();
    } catch (error) {
      if (error instanceof Error) {
        updateErrorMessages(stepKey, key as string, error.message); // key는 string으로 처리
      }
    }
  };

  return {
    formData,
    errorMessages,
    handleChange,
    handleBlur,
    handleKeyDown,
  };
}
