export { queryKeys };

const queryKeys = {
  COMMON: {
    BASE: "common",
    UPLOAD_IMAGE: "uploadImage",
  },
  AUTH: {
    BASE: "auth",
    GET_USER_INFO: "getUserInfo",
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
    GET_MYPAGE_INFO: "getMyPageInfo",
    GET_MYPAGE_BANNER: "getMyPageBanner",
    GET_CONNECTED_SNS: "getConnectedSns",
    GET_PAYMENT_LIST: "getPaymentList",
  },
  REWARD: {
    BASE: "reward",
    GET_REWARD_LIST: "getRewardList",
    GET_INVITE_REWARD_LIST: "getInviteRewardList",
  },
  SUBSCRIPTION: {
    BASE: "subscription",
    GET_PLAN_DISCOUNT: "getPlanDiscount",
    GET_SUBSCRIPTION_LIST: "getSubscriptionList",
    GET_SUBSCRIPTION_DETAIL: "getSubscriptionDetail",
    GET_SUBSCRIPTION_ADDRESS: "getSubscriptionAddress",
    GET_SUBSCRIPTION_BENEFITS: "getSubscriptionBenefits",
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
    GET_REVIEW_LIST: "getReviewList",
    GET_BEST_REVIEW_DETAIL: "getBestReviewDetail",
    GET_WRITABLE_REVIEW_LIST: "getWritableReviewList",
    GET_WRITTEN_REVIEW_LIST: "getWrittenReviewList",
    GET_REVIEW_DETAIL: "getReviewDetail",
    GET_REVIEW_DETAIL_IMAGE_LIST: "getReviewDetailImageList",
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
  GUT_CHECK: {
    BASE: "gutCheck",
    GET_GUT_CHECK_RESULT: "getGutCheckResult",
    GET_GUT_CHECK_LIST: "getGutCheckList",
  },
  S_VOUCHER: {
    BASE: "sVoucher",
    GET_OBESITY_DETAIL: "getObesityDetail",
  }
} as const;
