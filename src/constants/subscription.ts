const subscribePlanInfo = {
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
  },
} as const;

const toppingOption = {
  options: [
    { label: "80%", value: '0.8' },
    { label: "60%", value: '0.6' },
    { label: "40%", value: '0.4' },
    { label: "20%", value: '0.2' },
  ],
};


const kcalPerGramMap: Record<string, number> = {
  "STARTER PREMIUM +": 1.49462,
  "TURKEY&BEEF +": 1.46324,
  "DUCK&LAMB +": 1.47532,
  "LAMB&BEEF +": 1.55097,
};


const originSubscribeIdList = [
  27, 50, 98, 110, 115, 116, 125, 130, 134, 137, 139, 140, 190, 206, 213, 215,
  216, 229, 242, 263, 285, 319, 324, 355, 386, 391, 404, 452, 509, 565, 619,
  788, 795, 868, 891, 896, 1055, 1086, 1360, 1462, 1550, 1649, 1666, 1673, 1936,
  1989, 2015, 2069, 2073, 2167, 2220, 2222, 2288, 2305, 2324, 2329, 2330, 2473,
  2498, 2499, 2510, 2548, 2579, 2599, 2618, 2620, 2622, 2623, 2657, 2726, 2733,
  2803, 2813, 2815, 2855, 2861, 2929, 3044, 3056, 3063, 3082, 3114, 3125, 3140,
  3169, 3202, 3220, 3226, 3227, 3232, 3233, 3236, 3285, 3286, 3294, 3295, 3325,
  3338, 3363, 3364, 3373, 3376, 3382, 3389, 3403, 3487, 3499, 3501, 3659, 3671,
  3743, 3772, 3783, 3788, 3804, 3830, 3864, 3893, 3895, 3903, 3907, 3912, 3914,
  3915, 3925, 3926, 3931, 3941, 3942, 3944, 3949, 3958, 3965,
];

export { subscribePlanInfo, toppingOption, originSubscribeIdList, kcalPerGramMap };
export type PlanName = keyof typeof subscribePlanInfo;
