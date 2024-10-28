// 실제 검증 함수

import { SurveyFormData } from "@/types/survey";


// 문자열이 비어있는지 확인하는 함수
export const isNotEmpty = (str: string) => {
  if (!str || str.trim() === "") {
    throw new Error("항목을 입력해 주세요.");
  }
};

// 숫자인지 확인하는 함수
export const isNumber = (value: string | number) => {
  if (typeof value === "string" && !Number.isInteger(Number(value))) {
    throw new Error("숫자만 입력해 주세요.");
  }
};

// 문자열 길이가 적절한지 확인하는 함수
export const isValidLength = (value: SurveyFormData[keyof SurveyFormData]) => {
  if (typeof value === "string"  && (value.length < 1 || value.length > 10)) {
    throw new Error("1자 이상 10자 이하로 입력해주세요.");
  }
};
export const isNoneClick = (str: string) => {
  if (str === "NONE") {
    throw new Error("1자 이상 10자 이하로 입력해주세요.");
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
  (value: SurveyFormData[keyof SurveyFormData]) => void
> = {
  name: (value: SurveyFormData[keyof SurveyFormData]) => {
      isValidLength(value);
  },
  gender: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }
  },
  birth: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isNotEmpty(value);
    }
  },
  oldDog: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "boolean") {
      isChecked(value); // boolean 값 처리
    }
  },
  dogSize: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }
  },
  dogType: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }
  },
  weight: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string" || typeof value === "number") {
      isNumber(value);
    }
  },
  neutralization: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "boolean") {
      isChecked(value);
    }
  },
  activityLevel: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }
  },
  walkingCountPerWeek: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }
  },
  walkingTimePerOneTime: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }
  },
  dogStatus: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }
  },
  specificDogStatus: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }
  },
  specificDogStatusEtc: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }
  },
  snackCountLevel: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }
  },
  waterCountLevel: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }
  },
  supplement: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }

  },
  supplementEtc: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }
  },
  currentMeal: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }
  },
  inedibleFood: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }
  },
  inedibleFoodEtc: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }
  },
  recommendRecipeId: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string" && (!value || isNaN(Number(value)))) {
      throw new Error("레시피 ID를 입력해 주세요.");
    }
  },
  caution: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }
  },
  cautionEtc: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }
  },
  expectedPregnancyDay: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "string") {
      isChecked(value);
    }
  },
  newToRawDiet: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (typeof value === "boolean") {
      isChecked(value);
    }
  },
  priorityConcerns: (value: SurveyFormData[keyof SurveyFormData]) => {
    if (Array.isArray(value)) {
      if (value.length < 3) {
        throw new Error("3개의 항목을 선택해 주세요.");
      }
    } else {
      if (typeof value === "string") {
      isChecked(value);
    }
  }
  },
};
