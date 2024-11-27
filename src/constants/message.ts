export {ERROR_MESSAGES, UI_MESSAGES}

const ERROR_MESSAGES = {
  INVALID_LENGTH: '정보를 입력해주세요',
  INVALID_ONLY_NUMBER: "숫자만 입력해주세요.",
} as const;

const UI_MESSAGES = {
  RECOMMEND_RECIPE: '고민별 추천 레시피',
  RECIPE_TITLE: '위한 레시피를 선택해 주세요',
  RECIPE_SUBTITLE: '최대 2종류까지 레시피 선택이 가능합니다',
  DOUBLE_MEET_TITLE: '더블미트(복합 단백질) 레시피',
  SINGLE_MEET_TITLE: '싱글미트(단일 단백질) 레시피',
  PLAN_TITLE: '위한 플랜을 선택해 주세요',
  PLAN_SUBTITLE: '풀플랜: 2주 마다 배송 / 하프플랜: 4주마다배송',
} as const;


