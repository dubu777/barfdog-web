import { SurveyFormInfo } from "@/types/survey";
import { formatTime } from "@/utils";

export const NUMBERS = {
  petNameMinLength: 1,
  petNameMaxLength: 10,
} as const;

export const SURVEY_FORM_INFO: SurveyFormInfo = {
  step0: {
    name: {
      id: "name",
      inputType: "textField",
      title: "반려견 이름이 무엇인가요?",
      placeholder: "이름을 입력해주세요",
    },
  },
  step1: {
    gender: {
      id: "gender",
      inputType: "button",
      title: "성별은 무엇인가요?",
      isMultiSelect: false,
      options: [
        { id: "gender-MALE", value: "MALE", label: "수컷" },
        { id: "gender-FEMALE", value: "FEMALE", label: "암컷" },
      ],
    },
  },
  step2: {
    neutralization: {
      id: "neutralization",
      inputType: "button",
      title: "중성화 여부를 알려주세요",
      isMultiSelect: false,
      options: [
        { id: "neutralization했습니다", value: true, label: "했습니다" },
        { id: "neutralization안했습니다", value: false, label: "안했습니다" },
      ],
    },
  },
  step3: {
    dogSize: {
      id: "dogSize",
      inputType: "button",
      title: "견종은 무엇인가요?",
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
      title: "견종선택",
      placeholder: "견종을 선택해주세요.",
      options: [
        "품종 모름",
        "믹스",
        "골든 리트리버",
        "골든두들",
        "그레이 하운드",
        "그레이트 데인",
      ],
    },
  },
  step4: {
    birth: {
      id: "birth",
      inputType: "selectBox",
      title: "출생일은 언제인가요?",
      linkedFields: [
        {
          id: "year",
          label: "년",
          options: Array.from({ length: 50 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return { label: `${year}년`, value: year.toString() };
          }),
        },
        {
          id: "month",
          label: "월",
          options: Array.from({ length: 12 }, (_, i) => {
            const month = (i + 1).toString().padStart(2, "0");
            return { label: `${month}월`, value: month };
          }),
        },
      ],
    },
  },
  step5: {
    weight: {
      id: "weight",
      inputType: "textField",
      title: "몸무게는 얼마인가요?",
      placeholder: "몸무게를 입력해주세요",
      unit: "kg",
    },
  },
  step6: {
    dogStatus: {
      id: "dogStatus",
      inputType: "button",
      title: "현재 상태는 어떤가요?",
      isMultiSelect: true,
      options: [
        { id: "dogStatus-HEALTHY", value: "HEALTHY", label: "건강해요" },
        {
          id: "dogStatus-NEED_DIET",
          value: "NEED_DIET",
          label: "다이어트 필요",
        },
        { id: "dogStatus-OBESITY", value: "OBESITY", label: "심각한 비만" },
        { id: "dogStatus-PREGNANT", value: "PREGNANT", label: "임신한 상태" },
        { id: "dogStatus-LACTATING", value: "LACTATING", label: "수유 중" },
      ],
    },
  },
  step7: {
    activityLevel: {
      id: "activityLevel",
      inputType: "button",
      title: "활동량은 어떤가요?",
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
  },
  step8: {
    walkingCountPerWeek: {
      id: "walkingCountPerWeek",
      inputType: "selectBox",
      title: "산책량은 어떤가요?",
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
      title: "일주일 산책 횟수",
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
  },
  step9: {
    snackCountLevel: {
      id: "snackCountLevel",
      inputType: "button",
      title: "간식량은 어떤가요?",
      isMultiSelect: false,
      options: [
        {
          id: "snackCountLevel-LITTLE",
          value: "LITTLE",
          label: "적어요",
        },
        {
          id: "snackCountLevel-NORMAL",
          value: "NORMAL",
          label: "적당해요",
        },
        {
          id: "snackCountLevel-MUCH",
          value: "MUCH",
          label: "많아요",
        },
      ],
    },
  },
  step10: {
    waterCountLevel: {
      id: "waterCountLevel",
      inputType: "button",
      title: "음수량은 어떤가요?",
      isMultiSelect: false,
      options: [
        {
          id: "waterCountLevel-LITTLE",
          value: "LITTLE",
          label: "적어요",
        },
        {
          id: "waterCountLevel-NORMAL",
          value: "NORMAL",
          label: "적당해요",
        },
        {
          id: "waterCountLevel-MUCH",
          value: "MUCH",
          label: "많아요",
        },
      ],
    },
  },
  step11: {
    supplement: {
      id: "supplement",
      inputType: "button",
      title: "현재 먹고 있는 영양제는 무엇인가요?",
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
  },
  step12: {
    inedibleFood: {
      id: "inedibleFood",
      inputType: "button",
      title: "못 먹는 재료가 있나요?",
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
  },
  step13: {
    currentMeal: {
      id: "currentMeal",
      inputType: "button",
      title: "현재 먹고 있는 식사는 어떤 것인가요?",
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
  },
  step14: {
    caution: {
      id: "caution",
      inputType: "button",
      title: "건강적 특이사항, 질병이 있나요?",
      isMultiSelect: true,
      options: [
        { id: "caution-NONE", value: "NONE", label: "없어요" },
        { id: "caution-관절염", value: "관절염", label: "관절염" },
        {
          id: "caution-슬개골 탈구",
          value: "슬개골 탈구",
          label: "슬개골 탈구",
        },
        { id: "caution-피부염", value: "피부염", label: "피부염" },
        { id: "caution-당뇨병", value: "당뇨병", label: "당뇨병" },
        { id: "caution-귀 염증", value: "귀 염증", label: "귀 염증" },
        { id: "caution-눈물/안구", value: "눈물/안구", label: "눈물/안구" },
        { id: "caution-치주염", value: "치주염", label: "치주염" },
        { id: "caution-신장 질환", value: "신장 질환", label: "신장 질환" },
        { id: "caution-간 질환", value: "간 질환", label: "간 질환" },
        { id: "caution-췌장염", value: "췌장염", label: "췌장염" },
        { id: "caution-심장 질환", value: "심장 질환", label: "심장 질환" },
        { id: "caution-기타", value: "기타", label: "기타" },
      ],
    },
  },
  step15: {
    newToRawDiet: {
      id: "newToRawDiet",
      inputType: "button",
      title: "생식 급여가 처음인가요?",
      isMultiSelect: false,
      options: [
        { id: "newToRawDiet-Yes", value: true, label: "네" },
        { id: "newToRawDiet-NO", value: false, label: "아니요" },
      ],
    },
  },
  step16: {
    priorityConcerns: {
      id: "priorityConcerns",
      inputType: "button",
      title: "특별히 챙겨주고 싶은 부분은",
      isMultiSelect: true,
      options: [
        {
          id: "recommendRecipeId-5",
          value: "구토·설사·복통",
          label: "구토·설사·복통",
        },
        {
          id: "recommendRecipeId-6",
          value: "체중 조절",
          label: "체중 조절",
        },
        {
          id: "recommendRecipeId-7",
          value: "피로회복",
          label: "피로회복",
        },
        {
          id: "recommendRecipeId-8",
          value: "눈물·눈곱",
          label: "눈물·눈곱",
        },
        {
          id: "recommendRecipeId-9",
          value: "적은 음수량",
          label: "적은 음수량",
        },
        { id: "recommendRecipeId-10", value: "피부·모질", label: "피부·모질" },
        {
          id: "recommendRecipeId-11",
          value: "관절 건강",
          label: "관절 건강",
        },
        { id: "recommendRecipeId-12", value: "자견 발육", label: "자견 발육" },
        {
          id: "recommendRecipeId-13",
          value: "노령견 건강",
          label: "노령견 건강",
        },
      ],
    },
  },
} as const;
