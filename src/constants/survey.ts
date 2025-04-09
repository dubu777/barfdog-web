import { formatTime } from "@/utils/formatTime";
import { SurveyStepKeys } from "@/utils/validation/surveyValidation";

export {
  SURVEY_FORM_INFO,
  RECIPE_TEMP_DATA,
  SURVEY_NO_AUTO_NEXT_STEP,
  SURVEY_OPTIONAL_FIELDS,
  NONE_VALUE,
};



const SURVEY_FORM_INFO = {
  name: {
    id: "name",
    inputType: "textField",
    title: "반려견 이름이 무엇인가요?",
    placeholder: "이름을 입력해주세요",
  },
  gender: {
    id: "gender",
    inputType: "button",
    title: "의 성별은 무엇인가요?",
    isMultiSelect: false,
    options: [
      { id: "gender-MALE", value: "MALE", label: "수컷" },
      { id: "gender-FEMALE", value: "FEMALE", label: "암컷" },
    ],
  },
  neutralization: {
    id: "neutralization",
    inputType: "button",
    title: "의 중성화 여부를 알려주세요",
    isMultiSelect: false,
    options: [
      { id: "neutralization했습니다", value: true, label: "했습니다" },
      { id: "neutralization안했습니다", value: false, label: "안했습니다" },
    ],
  },
  dogSize: {
    id: "dogSize",
    inputType: "button",
    title: "의 견종은 무엇인가요?",
    isMultiSelect: false,
    options: [
      { id: "dogSize-SMALL", value: "SMALL", label: "소형견" },
      { id: "dogSize-MIDDLE", value: "MIDDLE", label: "중형견" },
      { id: "dogSize-LARGE", value: "LARGE", label: "대형견" },
    ],
  },
  dogType: {
    id: "dogType",
    inputType: "searchableSelectBox",
    placeholder1: "견종을 선택해주세요.",
    placeholder2: "견종을 입력해주세요.",
    options: [
      "품종 모름",
      "믹스",
      "골든 리트리버",
      "푸들(미니어처)",
      "푸들(스탠다드)",
      "푸들(토이)",
      "아나톨리아 셰퍼드(캉갈)",
    ],
  },
  birth: {
    id: "birth",
    inputType: "selectBox",
    title: "의 출생일은 언제인가요?",
    years: Array.from({ length: 50 }, (_, i) => {
      const year = new Date().getFullYear() - i;
      return {
        label: `${year}년`,
        value: year.toString(),
      };
    }),
    months: Array.from({ length: 12 }, (_, i) => {
      const month = (i + 1).toString().padStart(2, "0");
      return {
        label: `${month}월`,
        value: month,
      };
    }),
  },
  weight: {
    id: "weight",
    inputType: "textField",
    title: "의 몸무게는 얼마인가요?",
    placeholder: "몸무게를 입력해주세요",
    unit: "kg",
  },
  dogStatus: {
    id: "dogStatus",
    inputType: "button",
    title: "의 현재 상태는 어떤가요?",
    isMultiSelect: true,
    options: [
      { id: "dogStatus-HEALTHY", value: "HEALTHY", label: "건강해요" },
      { id: "dogStatus-NEED_DIET", value: "NEED_DIET", label: "다이어트 필요" },
      { id: "dogStatus-OBESITY", value: "OBESITY", label: "심각한 비만" },
      { id: "dogStatus-PREGNANT", value: "PREGNANT", label: "임신한 상태" },
      { id: "dogStatus-LACTATING", value: "LACTATING", label: "수유 중" },
    ],
  },
  activityLevel: {
    id: "activityLevel",
    inputType: "button",
    title: "의 활동량은 어떤가요?",
    isMultiSelect: false,
    options: [
      {
        id: "activityLevel-VERY_MUCH",
        value: "VERY_MUCH",
        label: "매우 많아요",
      },
      { id: "activityLevel-MUCH", value: "MUCH", label: "많아요" },
      { id: "activityLevel-NORMAL", value: "NORMAL", label: "보통" },
      { id: "activityLevel-LITTLE", value: "LITTLE", label: "적어요" },
      {
        id: "activityLevel-VERY_LITTLE",
        value: "VERY_LITTLE",
        label: "매우 적어요",
      },
    ],
  },
  walkingCountPerWeek: {
    id: "walkingCountPerWeek",
    inputType: "selectBox",
    title: "의 산책량은 어떤가요?",
    frontWord: "주 평균",
    placeholder: "횟수",
    options: Array.from({ length: 20 }, (_, i) => {
      const label = i === 19 ? `${i + 1} 회 이상` : `${i + 1} 회`;
      return {
        label,
        value: (i + 1).toString(),
      };
    }),
  },
  walkingTimePerOneTime: {
    id: "walkingTimePerOneTime",
    inputType: "selectBox",
    title: "의 일주일 산책 횟수",
    frontWord: "1회 당",
    placeholder: "시간",
    options: Array.from({ length: 6 }, (_, i) => {
      const value = (i * 0.5 + 0.5).toString();
      const label = i === 5 ? "3시간 이상" : formatTime(i * 0.5 + 0.5);
      return {
        label,
        value,
      };
    }),
  },
  snackCountLevel: {
    id: "snackCountLevel",
    inputType: "button",
    title: "의 간식량은 어떤가요?",
    isMultiSelect: false,
    options: [
      { id: "snackCountLevel-LITTLE", value: "LITTLE", label: "적어요" },
      { id: "snackCountLevel-NORMAL", value: "NORMAL", label: "적당해요" },
      { id: "snackCountLevel-MUCH", value: "MUCH", label: "많아요" },
    ],
  },
  waterCountLevel: {
    id: "waterCountLevel",
    inputType: "button",
    title: "의 음수량은 어떤가요?",
    isMultiSelect: false,
    options: [
      { id: "waterCountLevel-LITTLE", value: "LITTLE", label: "적어요" },
      { id: "waterCountLevel-NORMAL", value: "NORMAL", label: "적당해요" },
      { id: "waterCountLevel-MUCH", value: "MUCH", label: "많아요" },
    ],
  },
  supplement: {
    id: "supplement",
    inputType: "button",
    title: "의 현재 먹고 있는 영양제는 무엇인가요?",
    isMultiSelect: true,
    options: [
      { id: "supplement-NONE", value: "NONE", label: "없어요" },
      { id: "supplement-유산균", value: "유산균", label: "유산균" },
      { id: "supplement-오메가", value: "오메가-3", label: "오메가-3" },
      { id: "supplement-항산화", value: "항산화", label: "항산화" },
      { id: "supplement-관절", value: "관절", label: "관절" },
      { id: "supplement-눈", value: "눈", label: "눈" },
      { id: "supplement-피부", value: "피부", label: "피부" },
      { id: "supplement-면역력", value: "면역력", label: "면역력" },
      { id: "supplement-심장", value: "심장", label: "심장" },
      { id: "supplement-치아", value: "치아", label: "치아" },
      { id: "supplement-종합", value: "종합", label: "종합" },
      { id: "supplement-ETC", value: "ETC", label: "기타" },
    ],
  },
  supplementEtc: {
    id: "supplementEtc",
    name: "supplementEtc",
    placeholder: "선택지에 없는 경우 기재해주세요.",
  },
  inedibleFood: {
    id: "inedibleFood",
    inputType: "button",
    title: "의 못 먹는 재료가 있나요?",
    isMultiSelect: true,
    options: [
      { id: "inedibleFood-NONE", value: "NONE", label: "없어요" },
      { id: "inedibleFood-닭", value: "닭", label: "닭" },
      { id: "inedibleFood-칠면조", value: "칠면조", label: "칠면조" },
      { id: "inedibleFood-소", value: "소", label: "소" },
      { id: "inedibleFood-오리", value: "오리", label: "오리" },
      { id: "inedibleFood-양", value: "양", label: "양" },
      { id: "inedibleFood-ETC", value: "ETC", label: "기타" },
    ],
  },
  inedibleFoodEtc: {
    id: "inedibleFoodEtc",
    name: "inedibleFoodEtc",
    placeholder: "선택지에 없는 경우 기재해주세요.",
  },
  currentMeal: {
    id: "currentMeal",
    inputType: "button",
    title: "의 현재 먹고 있는 식사는 어떤 것인가요?",
    isMultiSelect: true,
    options: [
      { id: "currentMeal-건사료", value: "건사료", label: "건사료" },
      {
        id: "currentMeal-습식사료/캔",
        value: "습식사료/캔",
        label: "습식사료/캔",
      },
      { id: "currentMeal-생식", value: "생식", label: "생식" },
      { id: "currentMeal-화식", value: "화식", label: "화식" },
      { id: "currentMeal-수제사료", value: "수제사료", label: "수제사료" },
      {
        id: "currentMeal-동결건조사료",
        value: "동결건조사료",
        label: "동결건조사료",
      },
    ],
  },
  caution: {
    id: "caution",
    inputType: "button",
    title: "의 건강적 특이사항, 질병이 있나요?",
    isMultiSelect: true,
    options: [
      { id: "caution-NONE", value: "NONE", label: "없어요" },
      { id: "caution-관절염", value: "관절염", label: "관절염" },
      { id: "caution-슬개골 탈구", value: "슬개골 탈구", label: "슬개골 탈구" },
      { id: "caution-피부염", value: "피부염", label: "피부염" },
      { id: "caution-당뇨병", value: "당뇨병", label: "당뇨병" },
      { id: "caution-귀 염증", value: "귀 염증", label: "귀 염증" },
      { id: "caution-눈물/안구", value: "눈물/안구", label: "눈물/안구" },
      { id: "caution-치주염", value: "치주염", label: "치주염" },
      { id: "caution-신장 질환", value: "신장 질환", label: "신장 질환" },
      { id: "caution-간 질환", value: "간 질환", label: "간 질환" },
      { id: "caution-췌장염", value: "췌장염", label: "췌장염" },
      { id: "caution-심장 질환", value: "심장 질환", label: "심장 질환" },
      { id: "caution-기타", value: "ETC", label: "기타" },
    ],
  },
  cautionEtc: {
    id: "cautionEtc",
    name: "cautionEtc",
    placeholder: "선택지에 없는 경우 기재해주세요.",
  },
  newToRawDiet: {
    id: "newToRawDiet",
    inputType: "button",
    title: "의 생식 급여가 처음인가요?",
    isMultiSelect: false,
    options: [
      { id: "newToRawDiet-Yes", value: true, label: "네" },
      { id: "newToRawDiet-NO", value: false, label: "아니요" },
    ],
  },
  priorityConcerns: {
    id: "priorityConcerns",
    inputType: "button",
    title: "의 고민되는 항목 우선 순위 3가지를 선택해주세요.",
    isMultiSelect: true,
    options: [
      {
        id: "recommendRecipeId-5",
        value: "구토·설사·복통",
        label: "구토·설사·복통",
      },
      { id: "recommendRecipeId-6", value: "체중 조절", label: "체중 조절" },
      { id: "recommendRecipeId-7", value: "피로회복", label: "피로회복" },
      { id: "recommendRecipeId-8", value: "눈물·눈곱", label: "눈물·눈곱" },
      { id: "recommendRecipeId-9", value: "적은 음수량", label: "적은 음수량" },
      { id: "recommendRecipeId-10", value: "피부·모질", label: "피부·모질" },
      { id: "recommendRecipeId-11", value: "관절 건강", label: "관절 건강" },
      { id: "recommendRecipeId-12", value: "자견 발육", label: "자견 발육" },
      {
        id: "recommendRecipeId-13",
        value: "노령견 건강",
        label: "노령견 건강",
      },
    ],
  },
} as const;

export interface RecipeTempData {
  id: number;
  name: string;
  imageURL: string;
  ingredients: string[];
  efficacy: string[];
  type: "single" | "double";
}

export interface TempRecipeDto {
  id: number;
  name: string;
  imageURL: string;
}

const RECIPE_TEMP_DATA: Record<number, RecipeTempData> = {
  5: {
    id: 5,
    name: "스타터 프리미엄",
    imageURL: "/images/recipe/starter_premium.png",
    ingredients: ["닭", "칠면조"],
    efficacy: ["구토•설사", "관절 건강"],
    type: "double",
  },
  6: {
    id: 6,
    name: "터키앤비프",
    imageURL: "/images/recipe/turkey_and_beef.png",
ingredients: ["칠면조", "소"],
    efficacy: ["구토•설사", "관절 건강"],
    type: "double",
  },
  7: {
    id: 7,
    name: "덕앤램",
    imageURL: "/images/recipe/duck_and_lamb.png",
ingredients: ["오리", "양"],
    efficacy: ["구토•설사", "관절 건강"],
    type: "double",
  },
  8: {
    id: 8,
    name: "램앤비프",
    imageURL: "/images/recipe/lamb_and_beef.png",
ingredients: ["양", "소"],
    efficacy: ["구토•설사", "관절 건강"],
    type: "double",
  },
  9: {
    id: 9,
    name: "프리미엄 치킨",
    imageURL: "/images/recipe/premium_chicken.png",
    ingredients: ["닭"],
        efficacy: ["구토•설사", "관절 건강"],
    type: "single",
  },
  10: {
    id: 10,
    name: "프리미엄 터키",
    imageURL: "/images/recipe/premium_turkey.png",
ingredients: ["칠면조"],
    efficacy: ["구토•설사", "관절 건강"],
    type: "single",
  },
  11: {
    id: 11,
    name: "프리미엄 램",
    imageURL: "/images/recipe/premium_lamb.png",
ingredients: [""],
    efficacy: ["구토•설사", "관절 건강"],
    type: "single",
  },
  12: {
    id: 12,
    name: "프리미엄 비프",
    imageURL: "/images/recipe/premium_beef.png",
ingredients: ["양"],
    efficacy: ["구토•설사", "관절 건강"],
    type: "single",
  },
};


// 자동 다음 스텝으로 넘어가지 말아야 하는 스텝들을 Set으로 관리.
const SURVEY_NO_AUTO_NEXT_STEP = new Set<SurveyStepKeys>([
  "step3",
  "step10",
  "step11",
  "step12",
  "step13",
  "step14",
]);

// 빈 값이어도 검증 통과 시킬 필드들을 관리합니다.
const SURVEY_OPTIONAL_FIELDS = new Set([
  // step7
  "specificDogStatus",
  "specificDogStatusEtc",
  "expectedPregnancyDay",
  // step12
  "supplementEtc",
  // step13
  "inedibleFoodEtc",
  // step15
  "cautionEtc",
]);

const NONE_VALUE = "NONE";
