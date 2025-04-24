import { PlanInfo, PlanKey } from "@/types";

export {
  subscriptionStatus,
  DEFAULT_MEALS_PER_DAY,
  ORIGIN_SUBSCRIBE_ID_SET,
  LEGACY_RECIPE_CONSTANTS,
  subscriptionPlanInfo,
  numberOfPacksPerDay,
  recipeTab,
  deliveryOptions,
};

const subscriptionPlanInfo: Record<PlanKey, PlanInfo> = {
  FULL: {
    id: "FULL",
    label: "풀 플랜",
    numberOfPacksPerDay: 2,
    weeklyPaymentCycle: 2,
    totalNumberOfPacks: 28,
  },
  HALF: {
    id: "HALF",
    label: "하프 플랜",
    numberOfPacksPerDay: 1,
    weeklyPaymentCycle: 4,
    totalNumberOfPacks: 28,
  },
  TOPPING_FULL: {
    id: "TOPPING_FULL",
    label: "토핑 풀플랜",
    numberOfPacksPerDay: 1,
    weeklyPaymentCycle: 2,
    totalNumberOfPacks: 28,
  },
  TOPPING_HALF: {
    id: "TOPPING_HALF",
    label: "토핑 하프플랜",
    numberOfPacksPerDay: 1,
    weeklyPaymentCycle: 4,
    totalNumberOfPacks: 28,
    maxRecipeCount: 1,
  },
  // 삭제 예정
  TOPPING: {
    id: "TOPPING",
    label: "토핑 플랜",
    numberOfPacksPerDay: 1,
    weeklyPaymentCycle: 4,
    totalNumberOfPacks: 20,
    maxRecipeCount: 1,
  },
} as const;

const numberOfPacksPerDay = {
  1: "하루 한 끼",
  2: "하루 두 끼",
};


// 기본 하루 끼니 수
const DEFAULT_MEALS_PER_DAY = 2;

// 기존 구독 회원들에게 적용할 레거시 상수 (변경 이전 가격/그램)
const ORIGIN_SUBSCRIBE_ID_SET = new Set<number>([
  27, 50, 98, 110, 115, 116, 125, 130, 134, 137, 139, 140, 190, 206, 213, 215,
  216, 229, 242, 263, 285, 319, 324, 355, 386, 391, 404, 452, 509, 565, 619,
  788, 795, 868, 891, 896, 1055, 1086, 1360, 1462, 1550, 1649, 1666, 1673, 1936,
  1989, 2015, 2069, 2073, 2167, 2220, 2222, 2288, 2305, 2324, 2329, 2330, 2473,
  2498, 2499, 2510, 2548, 2579, 2599, 2618, 2620, 2622, 2623, 2657, 2726, 2733,
  2803, 2813, 2815, 2855, 2861, 2929, 3044, 3056, 3063, 3082, 3114, 3125, 3140,
  3169, 3202, 3220, 3226, 3227, 3232, 3233, 3236, 3285, 3286, 3294, 3295, 3325,
  3338, 3363, 3364, 3373, 3376, 3382, 3389, 3403, 3487, 3499, 3501, 3659, 3671,
  3709, 3743, 3772, 3783, 3788, 3804, 3830, 3864, 3893, 3895, 3903, 3907, 3912,
  3914, 3915, 3925, 3926, 3931, 3941, 3942, 3944, 3949, 3958, 3965,
]);

// 레거시 계산용 상수 (레시피 ID → { gramPerKcal, pricePerGram })
const LEGACY_RECIPE_CONSTANTS: Record<number, { gramPerKcal: number; pricePerGram: number }> = {
  5: { gramPerKcal: 1.49462, pricePerGram: 35.649 },
  6: { gramPerKcal: 1.46324, pricePerGram: 39.9 },
  7: { gramPerKcal: 1.47532, pricePerGram: 40.452 },
  8: { gramPerKcal: 1.55097, pricePerGram: 45.414 },
};

const subscriptionStatus: Record<string, string> = {
  // BEFORE_PAYMENT: '구독 비활성',
  // SURVEY_COMPLETED: '구독 비활성',
  // SUBSCRIBING: '구독 활성',
  // SUBSCRIBE_PENDING: '구독 비활성',
  // SUBSCRIBE_CANCEL: '구독 비활성',
  // SUBSCRIBE_WILL_CANCEL: '구독 취소예정',
  // ADMIN: '관리자구독',
  BEFORE_PAYMENT: "구독 전",
  SURVEY_COMPLETED: "설문 완료",
  SUBSCRIBE_WILL_CANCEL: "구독 취소 예정",
  SUBSCRIBE_CANCEL: "구독 취소",
  SUBSCRIBING: "구독 중",
  SUBSCRIBE_PENDING: "구독 보류", // = 실질적으로 "결제 전" 상태와 동일
  ADMIN: "관리자 구독",
};

const recipeTab = [
  {
    label: "더블미트",
    value: "double",
  },
  {
    label: "싱글미트",
    value: "single",
  },
  {
    label: "토퍼",
    value: "topper",
  },
  {
    label: "간식",
    value: "snack",
  },
];

const deliveryOptions = {
  mealFrequency: [
    { label: "하루 한 끼", value: "1", discountRate: "3%" },
    { label: "하루 두 끼", value: "2", discountRate: "5%" },
  ],
  deliveryCycle: [
    { label: "2주", value: "2" },
    { label: "4주", value: "4" },
  ]
};
