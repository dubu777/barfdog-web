export { queryKeys };

const queryKeys = {
  COMMON: {
    BASE: "common",
    UPLOAD_IMAGE: "uploadImage",
  },
  AUTH: {
    BASE: "auth",
    GET_USER_INFO: "getUserInfo",
    VERIFY_PASSWORD: "verifyPassword",
    LOGIN: "login",
  },
  SURVEY: {
    BASE: "survey",
    GET_SURVEY_RESULT: "getSurveyResult",
  },
  DIET_ANALYSIS: {
    BASE: "dietAnalysis",
    GET_DIET_ANALYSIS_RESULT: "getDietAnalysisResult",
    CREATE_DIET_ANALYSIS_RESULT: "createDietAnalysisResult",
  },
  COUPON: {
    BASE: "coupon",
    GET_COUPON_LIST: "getCouponList",
  },
  MYPAGE: {
    BASE: "mypage",
    COMMON: {
      BASE: "common",
      GET_MYPAGE_INFO: "getMyPageInfo",
      GET_MYPAGE_BANNER: "getMyPageBanner",
      GET_CONNECTED_SNS: "getConnectedSns",
      GET_PAYMENT_LIST: "getPaymentList",
    },
    COUPON: {
      BASE: "coupon",
      GET_COUPON_LIST: "getCouponList",
    },
    PROMOTION: {
      BASE: "promotion",
      GET_PROMOTION_LIST: "getPromotionList",
    },
    REVIEW: {
      BASE: "review",
      GET_MYPAGE_REVIEW_LIST: "getMypageReviewList",
      GET_REVIEW_DETAIL: "getReviewDetail",
    },
    REWARD: {
      BASE: "reward",
      GET_REWARD_LIST: "getRewardList",
      GET_REFERRAL_REWARD_LIST: "getReferralRewardList",
    },
  },
  SUBSCRIPTION: {
    BASE: "subscription",
    GET_PLAN_DISCOUNT: "getPlanDiscount",
    GET_SUBSCRIPTION_LIST: "getSubscriptionList",
    GET_SUBSCRIPTION_DETAIL: "getSubscriptionDetail",
    GET_SUBSCRIPTION_ADDRESS: "getSubscriptionAddress",
    GET_SUBSCRIPTION_BENEFITS: "getSubscriptionBenefits",
    GET_RAW_ORDER_SHEET: "getRawOrderSheet",
    GET_RAW_DETAIL: "getRawDetail",
  },
  CART: {
    BASE: "cart",
    GET_CART_INFO: "getCartInfo",
  },
  DOG: {
    BASE: "dog",
    GET_DOG_LIST: "getDogList",
    GET_DOG_DETAIL: "getDogDetail",
    GET_FULL_DOG_LIST: "getFullDogList",
    CHECK_DUPLICATE_DOG_NAME: "checkDuplicateDogName",
  },
  ORDER: {
    BASE: "order",
    GET_SUBSCRIPTION_ORDER: "getSubscriptionOrder",
    GET_ORDER_DETAIL: "getOrderDetail",
    GET_GENERAL_ORDER_LIST: "getGeneralOrderList",
    GET_SUBSCRIPTION_ORDER_LIST: "getSubscriptionOrderList",
    GET_GENERAL_ORDER: "getGeneralOrder",
  },
  CHECKOUT: {
    BASE: "checkout",
    GET_SUBSCRIPTION_CHECKOUT_SHEET: "getSubscriptionCheckoutSheet",
    GET_GENERAL_CHECKOUT_SHEET: "getGeneralCheckoutSheet",
  },
  MAIN: {
    BASE: "main",
    GET_MAIN_INFO: "getMainInfo",
    GET_MAIN_DEADLINE_BANNER: "getMainDeadlineBanner",
  },
  RECIPE: {
    BASE: "recipe",
    GET_RECIPE_LIST: "getRecipeList",
  },
  IAMPORT: {
    BASE: "iamport",
  },
  COMMUNITY: {
    NOTICE: {
      BASE: "notice",
      GET_NOTICE_LIST: "getNoticeList",
      GET_NOTICE_DETAIL: "getNoticeDetail",
    },
    ARTICLE: {
      BASE: "article",
      GET_ARTICLE_LIST: "getArticleList",
      GET_RECOMMEND_ARTICLE_LIST: "getRecommendArticleList",
      GET_ARTICLE_DETAIL: "getArticleDetail",
    },
  },
  REVIEW: {
    BASE: "review",
    GET_BEST_REVIEW_LIST: "getBestReviewList",
    GET_BEST_REVIEW_DETAIL: "getBestReviewDetail",
    GET_REVIEW_LIST: "getReviewList",
  },
  STORE: {
    BASE: "store",
    GET_STORE_ITEM_LIST: "getStoreItemList",
    GET_STORE_ITEM_DETAIL: "getStoreItemDetail",
    GET_STORE_ITEM_REVIEW_LIST: "getStoreItemReviewList",
  },
  DELIVERY: {
    BASE: "delivery",
    GET_ADDRESS_LIST: "getAddressList",
  },
  PROBIOME: {
    BASE: "probiome",
    GET_PROBIOME_RESULT: "getProbiomeResult",
    GET_PROBIOME_LIST: "getProbiomeList",
    CHECK_PROBIOME_KIT: "checkProbiomeKit",
    GET_PROBIOME_PRE_INFO: "getProbiomePreInfo",
  },
  PET: {
    BASE: "pet",
    GET_PET_LIST: "getPetList",
    GET_PET_DETAIL: "getPetDetail",
    GET_PET_BREED_LIST: "getPetBreedList",
    CHECK_DUPLICATE_PET_NAME: "checkDuplicatePetName",
  },
  DOGPEDIA: {
    BASE: "dogpedia",
    GET_BREED_LIST: "getBreedList",
    GET_BREED_DETAIL: "getBreedDetail",
  },
  MEDICAL_HISTORY: {
    BASE: "medicalHistory",
    GET_MEDICAL_HISTORY_LIST: "getMedicalHistoryList",
    GET_MEDICAL_HISTORY_DETAIL: "getMedicalHistoryDetail",
  },
  FULL_CHECK: {
    BASE: "fullCheck",
    GET_FULL_CHECK_SUMMARY: "getFullCheckSummary",
    GET_FULL_CHECK_LIST: "getFullCheckList",
    GET_FULL_CHECK_RESULT_DETAIL: "getFullCheckResultDetail",
  },
  BODY_CHECK: {
    BASE: "bodyCheck",
    GET_LATEST_BODY_CHECK: "getLatestBodyCheck",
    GET_BODY_CHECK_LIST: "getBodyCheckList",
    GET_BODY_CHECK_RESULT_DETAIL: "getBodyCheckResultDetail",
  },
} as const;
