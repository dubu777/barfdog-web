// 비만 설문 관련
export const OBESITY_SURVEY_SECTION = [
  { key: "1", steps: 3 },
  { key: "2", steps: 3 },
  { key: "3", steps: 4 },
];

export const OBESITY_SURVEY_ITEMS = [
  {
    key: "ribs",
    title: ["갈비뼈가", "손으로 쉽게 만져지나요?"],
    options: [
      { key: "ribs-1", label: "매우 쉽게 만져져요", value: 2 },
      { key: "ribs-2", label: "약간의 지방층과 함께 쉽게 만져져요", value: 4 },
      { key: "ribs-3", label: "적당하게 만져져요", value: 10 },
      { key: "ribs-4", label: "지방이 있어 잘 만져지지 않아요", value: 4 },
      { key: "ribs-5", label: "아예 만져지지 않아요", value: 2 },
    ],
    scoreCategory: [
      'weightBalanceScore',
    ]
  },
  {
    key: "waistLine",
    title: ["위에서 봤을 때", "허리선이 어떤 형태인가요?"],
    options: [
      {
        key: "waistLine-1",
        label: "허리뼈와 골반뼈가 튀어나와 있어요",
        value: 2,
      },
      { key: "waistLine-2", label: "허리선이 움푹 들어가 있어요", value: 4 },
      { key: "waistLine-3", label: "허리선이 잘 구별돼요", value: 10 },
      { key: "waistLine-4", label: "허리선이 거의 보이지 않아요", value: 4 },
      {
        key: "waistLine-5",
        label: "허리선이 아예 보이지 않고 불룩해요",
        value: 2,
      },
    ],
    scoreCategory: [
      'weightBalanceScore',
    ]
  },
  {
    key: "abdominalLine",
    title: ["옆에서 봤을 때", "복부는 어떤 형태인가요?"],
    options: [
      {
        key: "abdominalLine-1",
        label: "복부에 근육과 지방이 거의 없어요",
        value: 2,
      },
      { key: "abdominalLine-2", label: "복부가 위로 들어가 있어요", value: 4 },
      {
        key: "abdominalLine-3",
        label: "복부가 적당히 들어가 있어요",
        value: 10,
      },
      { key: "abdominalLine-4", label: "복부가 평평해요", value: 4 },
      { key: "abdominalLine-5", label: "복부가 심하게 처져 있어요", value: 2 },
    ],
    scoreCategory: [
      'weightBalanceScore',
    ]
  },
  {
    key: "weightGain",
    title: ["몸무게가 최근 2~3개월 사이", "눈에 띄게 늘었나요?"],
    options: [
      { key: "weightGain-1", label: "일정하게 유지되고 있어요", value: 10 },
      {
        key: "weightGain-2",
        label: "체중은 비슷한데 약간 통통해졌어요",
        value: 7,
      },
      { key: "weightGain-3", label: "체중이 10% 이상 늘었어요", value: 3 },
      {
        key: "weightGain-4",
        label: "눈으로 보기에도 확실히 살이 쪄 보여요",
        value: 1,
      },
    ],
    scoreCategory: [
      'weightBalanceScore',
    ]
  },
  {
    key: "easyFatigue",
    title: ["산책 중 금방 지치거나", "숨을 가쁘게 쉬나요?"],
    options: [
      { key: "easyFatigue-1", label: "아니요", value: 10 },
      { key: "easyFatigue-2", label: "가끔 지칠 때가 있어요", value: 7 },
      { key: "easyFatigue-3", label: "자주 숨을 헐떡여요", value: 3 },
      { key: "easyFatigue-4", label: "몇 분만 걸어도 힘들어해요", value: 1 },
    ],
    scoreCategory: [
      'activityScore',
    ]
  },
  {
    key: "climbJump",
    title: ["계단을 오르거나", "점프할 때 힘들어하나요?"],
    options: [
      { key: "climbJump-1", label: "아니요", value: 10 },
      { key: "climbJump-2", label: "가끔 머뭇거려요", value: 7 },
      { key: "climbJump-3", label: "자주 망설이거나 힘들어해요", value: 3 },
      { key: "climbJump-4", label: "거의 하지 않으려고 해요", value: 1 },
    ],
    scoreCategory: [
      'activityScore',
    ]
  },
  {
    key: "lethargy",
    title: ["하루 대부분을 누워서 보내고", "무기력해 보이나요?"],
    options: [
      { key: "lethargy-1", label: "아니요", value: 10 },
      { key: "lethargy-2", label: "가끔 늘어져 있어요", value: 7 },
      { key: "lethargy-3", label: "대부분의 시간을 누워있어요", value: 3 },
      { key: "lethargy-4", label: "거의 움직이려 하지 않아요", value: 1 },
    ],
    scoreCategory: [
      'activityScore',
    ]
  },
  {
    key: "hunger",
    title: ["식사 후에도 계속 음식을 찾거나", "허기를 느끼나요?"],
    options: [
      { key: "hunger-1", label: "아니요", value: 10 },
      { key: "hunger-2", label: "가끔 더 먹으려는 행동을 보여요", value: 7 },
      { key: "hunger-3", label: "식사 후에도 계속 주변을 살펴요", value: 3 },
      {
        key: "hunger-4",
        label: "밥그릇을 핥거나 간식을 찾으러 다녀요",
        value: 1,
      },
    ],
    scoreCategory: [
      'dietaryScore',
    ]
  },
  {
    key: "snackFrequency",
    title: ["간식을 얼마나 자주 먹나요?"],
    options: [
      { key: "snackFrequency-1", label: "거의 먹지 않아요", value: 10 },
      { key: "snackFrequency-2", label: "하루 1회", value: 7 },
      { key: "snackFrequency-3", label: "하루 2회", value: 3 },
      { key: "snackFrequency-4", label: "하루 3회 이상", value: 1 },
    ],
    scoreCategory: [
      'dietaryScore',
    ]
  },
  {
    key: "mealPortion",
    title: ["식사량을 정해진 만큼", "급여하고 있나요?"],
    options: [
      { key: "mealPortion-1", label: "항상 정량을 지켜요", value: 10 },
      { key: "mealPortion-2", label: "가끔 조금 더 주게 돼요", value: 7 },
      { key: "mealPortion-3", label: "아이가 원하면 항상 더 줘요", value: 3 },
      {
        key: "mealPortion-4",
        label: "양을 정하지 않고 그때그때 달라요",
        value: 1,
      },
    ],
    scoreCategory: [
      'dietaryScore',
    ]
  },
];
