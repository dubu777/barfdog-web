export {queryKeys}

const queryKeys = {
  SURVEY: {
    BASE: 'survey',
    GET_SURVEY_RECIPE: 'getSurveyRecipe',
    GET_SURVEY_RESULT: 'getSurveyResult',
  },
  COUPON: {
    BASE: 'coupon',
    GET_COUPON_LIST: 'getCouponList',
  },
  MYPAGE: {
    BASE: 'mypage',
    GET_MYPAGE_INFO: 'getMyPageInfo',
    GET_MYPAGE_BANNER: 'getMyPageBanner',
  },
  REWARD: {
    BASE: 'reward',
    GET_REWARD_LIST: 'getRewardList',
  },
  SUBSCRIPTION: {
    BASE: 'subscription',
    GET_PLAN_DISCOUNT: 'getPlanDiscount',
    GET_SUBSCRIPTION_LIST: 'getSubscriptionList',
    GET_SUBSCRIPTION_DETAIL: 'getSubscriptionDetail',
    GET_SUBSCRIPTION_ADDRESS: 'getSubscriptionAddress',
    GET_SUBSCRIPTION_BENEFITS: 'getSubscriptionBenefits',
  },
  CART: {
    BASE: 'cart',
    GET_CART_INFO: 'getCartInfo',
  },
  DOG: {
    BASE: 'dog',
    GET_DOG_LIST: 'getDogList',
  },
  ORDER: {
    BASE: 'order',
    GET_ORDER_SHEET: 'getOrderSheet',
    GET_ORDER_DETAIL: 'getOrderDetail',
    GET_GENERAL_ORDER_LIST: 'getGeneralOrderList',
    GET_SUBSCRIPTION_ORDER_LIST: 'getSubscriptionOrderList',
    GET_ORDER_ADDRESS: 'getOrderAddress',
  },
  MAIN: {
    BASE: 'main',
    GET_MAIN_INFO: 'getMainInfo',
    GET_MAIN_DEADLINE_BANNER: 'getMainDeadlineBanner',
  },
  RECIPE: {
    BASE: 'recipe',
    GET_RECIPE_LIST: 'getRecipeList',
  }
} as const;
