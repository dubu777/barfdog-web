// 위/장 설문 관련
const GASTRO_SURVEY_SECTION = [
  { key: "1", steps: 5 },
  { key: "2", steps: 5 },
  { key: "3", steps: 5 },
];

const GASTRO_COMMON_OPTIONS = [
  { key: "common-1", label: "없어요", value: 8 },
  { key: "common-2", label: "주 1-2회", value: 6 },
  { key: "common-3", label: "주 3-4회", value: 3 },
  { key: "common-4", label: "거의 매일", value: 1 },
];

const GASTRO_SURVEY_ITEMS = [
  {
    key: "vomiting",
    options: GASTRO_COMMON_OPTIONS,
    title: ["식후 음식물을", "토해내는 경우가 있나요?"],
    scoreCategory: [
      'hemorrhagicEnteritisScore',
      'gastricUlcerScore',
      'enteritisScore',
    ]
  },
  {
    key: "hematemesis",
    options: GASTRO_COMMON_OPTIONS,
    title: ["구토 시 피가", "섞여 나온 적이 있나요?"],
    scoreCategory: [
      'hemorrhagicEnteritisScore',
      'gastricUlcerScore',
    ]
  },
  {
    key: "diarrhea",
    options: GASTRO_COMMON_OPTIONS,
    title: ["배변이 묽거나 물처럼", "흐르는 경우가 있나요?"],
    scoreCategory: [
      'hemorrhagicEnteritisScore',
      'enteritisScore',
      'ibsScore',
    ]
  },
  {
    key: "stoolMucus",
    options: GASTRO_COMMON_OPTIONS,
    title: ["배변에 끈적한 점액이", "묻어 나온 적이 있나요?"],
    scoreCategory: [
      'hemorrhagicEnteritisScore',
      'enteritisScore',
      'ibsScore',
    ]
  },
  {
    key: "stoolColor",
    options: [
      { key: "stoolColor-1", label: "정상적인 갈색변이에요", value: 8 },
      { key: "stoolColor-2", label: "가끔 혈변이 나와요", value: 6 },
      { key: "stoolColor-3", label: "혈변을 자주 해요", value: 3 },
      { key: "stoolColor-4", label: "종종 까만 변이 나와요", value: 1 },
    ],
    title: ["배변 색이 검거나", "피가 섞여 나온 적이 있나요?"],
    scoreCategory: [
      'hemorrhagicEnteritisScore',
      'gastricUlcerScore',
      'enteritisScore',
    ]
  },
  {
    key: "frequentBowelMovement",
    options: GASTRO_COMMON_OPTIONS,
    title: ["배변을 자주 시도하지만", "양이 적거나 힘만 주는 경우가 있나요?"],
    scoreCategory: [
      'enteritisScore',
      'ibsScore',
    ]
  },
  {
    key: "decreasedAppetite",
    options: [
      { key: "decreasedAppetite-1", label: "식욕이 좋아요", value: 8 },
      { key: "decreasedAppetite-2", label: "평소보다 덜 먹어요", value: 6 },
      {
        key: "decreasedAppetite-3",
        label: "식사량이 절반으로 줄었어요",
        value: 3,
      },
      {
        key: "decreasedAppetite-4",
        label: "거의 먹으려 하지 않아요",
        value: 1,
      },
    ],
    title: ["식욕이 줄거나 평소보다", "양이 급격하게 감소했나요?"],
    scoreCategory: [
      'hemorrhagicEnteritisScore',
      'gastricUlcerScore',
      'enteritisScore',
    ]
  },
  {
    key: "abdominalPain",
    options: [
      { key: "abdominalPain-1", label: "아니요", value: 8 },
      { key: "abdominalPain-2", label: "약간 불편해 해요", value: 6 },
      { key: "abdominalPain-3", label: "불편해 해요", value: 3 },
      { key: "abdominalPain-4", label: "매우 불편해 해요", value: 1 },
    ],
    title: ["배를 만지면 아파하거나", "불편한 듯한 반응을 보이나요?"],
    scoreCategory: [
      'hemorrhagicEnteritisScore',
      'gastricUlcerScore',
      'enteritisScore',
      'ibsScore',
    ]
  },
  {
    key: "lethargy",
    options: [
      { key: "lethargy-1", label: "활발해요", value: 8 },
      { key: "lethargy-2", label: "평소보다 지쳐보여요", value: 6 },
      { key: "lethargy-3", label: "활동량 중 쉽게 지쳐해요", value: 3 },
      { key: "lethargy-4", label: "요즘들어 항상 무기력해요", value: 1 },
    ],
    title: ["평소보다 무기력하거나", "쉽게 지치는 모습을 보이나요?"],
    scoreCategory: [
      'hemorrhagicEnteritisScore',
      'gastricUlcerScore',
      'enteritisScore',
    ]
  },
  {
    key: "borborygmus",
    options: GASTRO_COMMON_OPTIONS,
    title: ["배에서 꾸르륵거리는", "소리가 자주 들리나요?"],
    scoreCategory: [
      'enteritisScore',
      'ibsScore',
    ]
  },
  {
    key: "mealRoutine",
    options: [
      { key: "mealRoutine-1", label: "거의 먹지 않아요", value: 4 },
      { key: "mealRoutine-2", label: "하루 1회", value: 3 },
      { key: "mealRoutine-3", label: "하루 2회", value: 2 },
      { key: "mealRoutine-4", label: "하루 3회 이상", value: 1 },
    ],
    title: ["식사 시간과 ", "횟수가 일정한가요?"],
    scoreCategory: [
      'gastroLifestyleScore',
    ]
  },
  {
    key: "snacks",
    options: [
      { key: "snacks-1", label: "거의 먹지 않아요", value: 4 },
      { key: "snacks-2", label: "하루 1회", value: 3 },
      { key: "snacks-3", label: "하루 2회", value: 2 },
      { key: "snacks-4", label: "하루 3회 이상", value: 1 },
    ],
    title: ["간식을", "얼마나 자주 먹나요?"],
    scoreCategory: [
      'gastroLifestyleScore',
    ]
  },
  {
    key: "humanFood",
    options: [
      { key: "humanFood-1", label: "먹지 않아요", value: 4 },
      { key: "humanFood-2", label: "가끔 먹어요", value: 3 },
      { key: "humanFood-3", label: "종종 먹어요", value: 2 },
      { key: "humanFood-4", label: "매일 먹어요", value: 1 },
    ],
    title: ["사람 음식을", "자주 섭취하나요?"],
    scoreCategory: [
      'gastroLifestyleScore',
    ]
  },
  {
    key: "stress",
    options: [
      { key: "stress-1", label: "받지 않아요", value: 4 },
      { key: "stress-2", label: "가끔 받아요", value: 3 },
      { key: "stress-3", label: "자주 스트레스를 받아요", value: 2 },
      { key: "stress-4", label: "지속적으로 받아요", value: 1 },
    ],
    title: ["스트레스를", "자주 받는 환경인가요?"],
    scoreCategory: [
      'gastroLifestyleScore',
    ]
  },
  {
    key: "probiotics",
    options: [
      { key: "probiotics-1", label: "먹지 않아요", value: 4 },
      { key: "probiotics-2", label: "주 1-2회", value: 3 },
      { key: "probiotics-3", label: "주 3-4회", value: 2 },
      { key: "probiotics-4", label: "거의 매일", value: 1 },
    ],
    title: ["장 건강을 위해 유산균이나", "섬유질을 급여하나요?"],
    scoreCategory: [
      'gastroLifestyleScore',
    ]
  },
];

export {
  GASTRO_SURVEY_SECTION,
  GASTRO_COMMON_OPTIONS,
  GASTRO_SURVEY_ITEMS ,
};

