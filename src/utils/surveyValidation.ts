// 실제 검증 함수

import { SurveyFormData } from "@/types/survey";

// 숫자인지 확인하는 함수
export const isNumber = (value: string | number) => {
  if (typeof value === "string" && !Number.isInteger(Number(value))) {
    throw new Error("숫자만 입력해 주세요.");
  }
};

// 문자열 길이가 적절한지 확인하는 함수
export const isValidLength = (value: string, min: number, max: number) => {
  if (typeof value === "string" && (value.length < min || value.length > max)) {
    throw new Error(`${min}자 이상 ${max}자 이하로 작성해주세요.`);
  }
};

// boolean 또는 string을 처리하는 함수
export const isChecked = (value: SurveyFormData[keyof SurveyFormData]) => {
  if (value === null || value === "") {
    throw new Error("항목을 선택해 주세요.");
  }
  // 불리언 값이 있을 때는 에러를 발생시키지 않음
  if (typeof value === "boolean") {
    return; // 불리언 값이 있으면 통과
  } else if (typeof value === "string") {
    if (!value.trim()) {
      throw new Error("항목을 선택해 주세요.");
    }
  }
};

// 유효성 검증 적용
export const surveyValidation: Record<
  keyof SurveyFormData,
  (
    value: SurveyFormData[keyof SurveyFormData],
  ) => void
> = {
  name: (value: SurveyFormData[keyof SurveyFormData]) => {},
  gender: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  birth: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  oldDog: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  dogSize: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  dogType: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  weight: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string" || typeof value === "number") {
      isNumber(value);
    }
  },
  neutralization: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  activityLevel: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  walkingCountPerWeek: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  walkingTimePerOneTime: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  dogStatus: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  specificDogStatus: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  specificDogStatusEtc: (value: SurveyFormData[keyof SurveyFormData]) => {

  },
  snackCountLevel: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  waterCountLevel: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  supplement: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  supplementEtc: (value: SurveyFormData[keyof SurveyFormData]) => {

  },
  currentMeal: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  inedibleFood: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  inedibleFoodEtc: (value: SurveyFormData[keyof SurveyFormData]) => {

  },
  recommendRecipeId: (value: SurveyFormData[keyof SurveyFormData]) => {},
  caution: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  cautionEtc: (value: SurveyFormData[keyof SurveyFormData]) => {

  },
  expectedPregnancyDay: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  newToRawDiet: (value: SurveyFormData[keyof SurveyFormData]) => {
    isChecked(value);
  },
  priorityConcerns: (
    value: SurveyFormData[keyof SurveyFormData],
  ) => {
    isChecked(value);
  },
};
