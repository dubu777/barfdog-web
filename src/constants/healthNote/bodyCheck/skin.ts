// 피부 설문 관련
export const SKIN_SURVEY_SECTION = [
  { key: "1", steps: 5 },
  { key: "2", steps: 5 },
  { key: "3", steps: 5 },
];

export const SKIN_SURVEY_ITEMS = [
  {
    key: "keratin",
    title: ["피부에 비듬처럼", "하얀 각질이 있나요?"],
    options: [
      { key: "keratin-1", label: "없어요", value: 8 },
      { key: "keratin-2", label: "가끔 있어요", value: 6 },
      { key: "keratin-3", label: "자주 나타나요", value: 3 },
      { key: "keratin-4", label: "항상 각질이 있어요", value: 1 },
    ],
    scoreCategory: [
      'mycoticDermatitisScore',
      'malasseziaDermatitisScore',
    ]
  },
  {
    key: "smell",
    title: ["피부가 기름지거나", "냄새가 나는 편인가요?"],
    options: [
      { key: "smell-1", label: "아니요", value: 8 },
      { key: "smell-2", label: "약간 기름져요", value: 6 },
      { key: "smell-3", label: "냄새가 조금 심한 편이에요", value: 3 },
      { key: "smell-4", label: "냄새가 많이 심해요", value: 1 },
    ],
    scoreCategory: [
      'malasseziaDermatitisScore',
    ]
  },
  {
    key: "itch",
    title: ["평소 몸을 자주 긁거나", "핥는 행동을 보이나요?"],
    options: [
      { key: "itch-1", label: "아니요", value: 8 },
      { key: "itch-2", label: "가끔 그래요", value: 6 },
      { key: "itch-3", label: "자주 그래요", value: 3 },
      { key: "itch-4", label: "거의 항상 그래요", value: 1 },
    ],
    scoreCategory: [
      'bacterialDermatitisScore',
      'mycoticDermatitisScore',
      'fleaTickDermatitisScore',
      'malasseziaDermatitisScore',
    ]
  },
  {
    key: "redSpots",
    title: ["긁은 부위에 붉은 반점이나", "딱지가 생긴 적이 있나요?"],
    options: [
      { key: "redSpots-1", label: "없어요", value: 8 },
      { key: "redSpots-2", label: "붉은 부위가 조금 있어요", value: 6 },
      { key: "redSpots-3", label: "딱지가 종종 보여요", value: 3 },
      { key: "redSpots-4", label: "붉은 반점과 딱지가 심해요", value: 1 },
    ],
    scoreCategory: [
      'bacterialDermatitisScore',
      'mycoticDermatitisScore',
      'fleaTickDermatitisScore',
      'malasseziaDermatitisScore',
    ]
  },
  {
    key: "rubbing",
    title: ["몸이나 얼굴을 자주 문지르거나", "비비는 행동을 하나요?"],
    options: [
      { key: "rubbing-1", label: "아니요", value: 8 },
      { key: "rubbing-2", label: "가끔 그래요", value: 6 },
      { key: "rubbing-3", label: "딱지가 종종 보여요", value: 3 },
      { key: "rubbing-4", label: "붉은 반점과 딱지가 심해요", value: 1 },
    ],
    scoreCategory: [
      'fleaTickDermatitisScore',
      'malasseziaDermatitisScore',
    ]
  },
  {
    key: "heat",
    title: ["피부에 붓기나 열감이", "느껴지는 부위가 있나요?"],
    options: [
      { key: "heat-1", label: "없어요", value: 8 },
      { key: "heat-2", label: "붓기만 있어요", value: 6 },
      { key: "heat-3", label: "딱지가 종종 보여요", value: 3 },
      { key: "heat-4", label: "붉은 반점과 딱지가 심해요", value: 1 },
    ],
    scoreCategory: [
      'bacterialDermatitisScore',
      'fleaTickDermatitisScore',
      'malasseziaDermatitisScore',
    ]
  },
  {
    key: "discoloration",
    title: ["피부가 어두워지거나", "착색된 부위가 있나요?"],
    options: [
      { key: "discoloration-1", label: "없어요", value: 8 },
      { key: "discoloration-2", label: "약간 어두운 곳이 있어요", value: 6 },
      { key: "discoloration-3", label: "눈에 띄게 어두워졌어요", value: 3 },
      { key: "discoloration-4", label: "착색이 심하게 됐어요", value: 1 },
    ],
    scoreCategory: [
      'malasseziaDermatitisScore',
    ]
  },
  {
    key: "alopecia",
    title: ["탈모가 동그랗게", "나타난 곳이 있나요?"],
    options: [
      { key: "alopecia-1", label: "없어요", value: 8 },
      { key: "alopecia-2", label: "탈모가 작게 있어요", value: 6 },
      { key: "alopecia-3", label: "또렷하게 동그란 탈모가 있어요", value: 3 },
      { key: "alopecia-4", label: "동그란 탈모가 넓게 퍼져있어요", value: 1 },
    ],
    scoreCategory: [
      'mycoticDermatitisScore',
    ]
  },
  {
    key: "lethargy",
    title: ["피부가 진물처럼 축축하거나", "노란 분비물이 있나요?"],
    options: [
      { key: "lethargy-1", label: "없어요", value: 8 },
      { key: "lethargy-2", label: "약간 보여요", value: 6 },
      { key: "lethargy-3", label: "노란 분비물이 있어요", value: 3 },
      { key: "lethargy-4", label: "진물이 심해요", value: 1 },
    ],
    scoreCategory: [
      'bacterialDermatitisScore',
    ]
  },
  {
    key: "secondaryInfection",
    title: ["긁은 부위가", "붓기나 진물이 있나요?"],
    options: [
      { key: "secondaryInfection-1", label: "없어요", value: 8 },
      { key: "secondaryInfection-2", label: "약간 부어있어요", value: 6 },
      { key: "secondaryInfection-3", label: "진물이 살짝 나와요", value: 3 },
      {
        key: "secondaryInfection-4",
        label: "많이 붓고 진물이 나와요",
        value: 1,
      },
    ],
    scoreCategory: [
      'bacterialDermatitisScore',
    ]
  },
  {
    key: "bathing",
    title: ["피부 상태에 따라 목욕 빈도나", "제품을 조절하고 있나요?"],
    options: [
      { key: "bathing-1", label: "잘 조절하고 있어요", value: 4 },
      { key: "bathing-2", label: "기본 목욕 주기만 지켜요", value: 3 },
      { key: "bathing-3", label: "잘 모르겠어요", value: 2 },
      { key: "bathing-4", label: "신경쓰지 않아요", value: 1 },
    ],
    scoreCategory: [
      'skinLifestyleScore',
    ]
  },
  {
    key: "postBathDry",
    title: ["목욕 후 아이의 피부를", "충분히 건조시키고 있나요?"],
    options: [
      { key: "postBathDry-1", label: "완전히 건조시켜요", value: 4 },
      { key: "postBathDry-2", label: "어느 정도만 말려요", value: 3 },
      { key: "postBathDry-3", label: "자연 건조해요", value: 2 },
      { key: "postBathDry-4", label: "특별히 건조시키지 않아요", value: 1 },
    ],
    scoreCategory: [
      'skinLifestyleScore',
    ]
  },
  {
    key: "postWalkClean",
    title: ["산책 후 발과 배, 털 등을", "닦아주는 습관이 있나요?"],
    options: [
      { key: "postWalkClean-1", label: "항상 닦아요", value: 4 },
      { key: "postWalkClean-2", label: "종종 닦아요", value: 3 },
      { key: "postWalkClean-3", label: "거의 닦아주지 않아요", value: 2 },
      { key: "postWalkClean-4", label: "신경쓰지 않아요", value: 1 },
    ],
    scoreCategory: [
      'skinLifestyleScore',
    ]
  },
  {
    key: "indoorEnvironment",
    title: ["실내 바닥, 침구 등을", "주기적으로 소독·세탁하나요?"],
    options: [
      { key: "indoorEnvironment-1", label: "주기적으로 관리해요", value: 4 },
      { key: "indoorEnvironment-2", label: "가끔 관리해요", value: 3 },
      { key: "indoorEnvironment-3", label: "거의 관리하지 않아요", value: 2 },
      { key: "indoorEnvironment-4", label: "전혀 하지 않아요", value: 1 },
    ],
    scoreCategory: [
      'skinLifestyleScore',
    ]
  },
  {
    key: "coatCare",
    title: ["털 관리를", "어떻게 하고 있나요?"],
    options: [
      {
        key: "coatCare-1",
        label: "매일 빗질하여 털 엉킴도 확인해요",
        value: 4
      },
      { key: "coatCare-2", label: "가끔 털을 빗겨주고 손질해요", value: 3 },
      { key: "coatCare-3", label: "외출할 때 어쩌다 한 번 손질해요", value: 2 },
      { key: "coatCare-4", label: "털 손질을 따로 하지 않아요", value: 1 },
    ],
    scoreCategory: [
      'skinLifestyleScore',
    ]
  },
];
