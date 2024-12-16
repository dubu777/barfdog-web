export {queryKeys}

const queryKeys = {
  SURVEY: 'survey',
  GET_SURVEY_RECIPE: 'getSurveyRecipe',
  GET_SURVEY_RESULT: 'getSurveyResult',
  COUPON: 'coupon',
  GET_COUPON_LIST: 'getCouponList',
  MYPAGE: 'mypage',
  GET_MYPAGE_INFO: 'getMyPageInfo',
  GET_MYPAGE_BANNER: 'getMyPageBanner',
  REWARDS: 'rewards',
  GET_REWARDS_LIST: 'getRewards',
  SUBSCRIBE: 'subscribe',
  GET_SUBSCRIPTION_BY_ID: 'getSubscriptionById',
  SUBSCRIPTION: 'subscription',
  GET_DISCOUNT_INFO: 'getDiscountInfo',
  CART: 'cart',
  GET_CART_DATA: 'getCartData',
  GET_PLAN_DISCOUNT: 'getPlanDiscount',
  DOG: 'dog',
  GET_DOGS: 'getDogs',
  GET_ORDER_SHEET: 'getOrderSheet',
  SKIP_SUBSCRIPTION: 'skipSubscription',
  ORDER: 'order',
  ORDER_DETAIL: 'orderDetail',
  GET_SUBSCRIPTION_ORDER_SHEET: 'getSubscriptionOrderSheet',
  GET_GENERAL_ORDER_SHEET: 'getGeneralOrderSheet',
  GET_SUBSCRIBE_ORDER_LIST: 'getSubscribeOrderList',
  GET_GENERAL_ORDER_LIST: 'getGeneralOrderList',
  GET_SUBSCRIBE_LIST: 'getSubscribeList',
  GET_PACKAGE_BENEFITS: 'getPackageBenefits',
  GET_DELIVERY_ADDRESS: 'getDeliveryAddress',
  GET_ADDRESS: 'getAddress',
} as const


export const queryKeys2 = {
  SURVEY: {
    BASE: 'survey',
    GET_RECIPE: 'getSurveyRecipe',
    GET_RESULT: 'getSurveyResult',
  },
  COUPON: {
    BASE: 'coupon',
    GET_LIST: 'getCouponList',
  },
  MYPAGE: {
    BASE: 'mypage',
    GET_INFO: 'getMyPageInfo',
    GET_BANNER: 'getMyPageBanner',
  },
  REWARDS: {
    BASE: 'rewards',
    GET_LIST: 'getRewards',
  },
  SUBSCRIPTION: {
    BASE: 'subscription',
    GET_DISCOUNT_INFO: 'getDiscountInfo',
    GET_BY_ID: 'getSubscriptionById',
    SKIP: 'skipSubscription',
  },
  CART: {
    BASE: 'cart',
    GET_DATA: 'getCartData',
  },
  PLAN: {
    BASE: 'plan',
    GET_DISCOUNT: 'getPlanDiscount',
  },
  DOG: {
    BASE: 'dog',
    GET_LIST: 'getDogs',
  },
  ORDER: {
    BASE: 'order',
    GET_SHEET: 'getOrderSheet',
    DETAIL: 'orderDetail',
    GET_SUBSCRIBE_LIST: 'getSubscribeList',
    GET_GENERAL_ORDER_LIST: 'getGeneralOrderList',
    GET_SUBSCRIBE_ORDER_LIST: 'getSubscribeOrderList',
    GET_DELIVERY: 'getDeliveryAddress',
    GET_ADDRESS: 'getAddress',
  },
} as const;
