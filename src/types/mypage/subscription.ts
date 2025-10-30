import { VISIBLE_SUBSCRIPTION_STATUS } from "@/constants/mypage/subscription";
import { PlanKey } from "../subscription";
import { subscriptionStatus } from "@/constants";
import { DiscountType, Page } from "../common";

type SubscriptionStatus = keyof typeof subscriptionStatus;

type VisibleSubscribeStatus = keyof typeof VISIBLE_SUBSCRIPTION_STATUS;

interface SubscriptionItem {
  subscribeId: number;
  pictureUrl: null | string;
  status: SubscriptionStatus;
  plan: PlanKey;
  dogName: string;
  countSkipOneTime: number;
  countSkipOneWeek: number;
  nextPaymentDate: null | string;
  nextPaymentPrice: number;
  discountCoupon: number;
  discountGrade: number;
  overDiscount: number;
  recipeNames: string;
}

interface SubscriptionList {
  subscriptionList: SubscriptionItem[];
  pagination: Page;
}

interface SubscriptionInfo {
  id: number;
  subscribeStatus: SubscriptionStatus;
  dogId: number;
  dogName: string;
  cancelReason: null | string;
  subscribeCount: number;
  plan: PlanKey;
  oneMealGramsPerRecipe: string;
  oneDayRecommendKcal: number;
  nextPaymentDate: string;
  countSkipOneTime: number;
  countSkipOneWeek: number;
  nextPaymentPrice: number;
  discountCoupon: number;
  discountGrade: number;
  overDiscount: number;
  nextDeliveryDate: string;
  usingMemberCouponId: null | number;
  couponName: null | string;
}

interface RecipeInfo {
  id: number;
  name: string;
  description: string;
  pricePerGram: number;
  gramPerKcal: number;
  inStock: boolean;
  imgUrl: string;
}

interface MemberCouponInfo {
  memberCouponId: number;
  name: string;
  discountType: DiscountType;
  discountDegree: number;
  availableMaxDiscount: number;
  availableMinPrice: number;
  remaining: number;
  expiredDate: string;
}

interface SubscriptionDetail {
  subscriptionInfo: SubscriptionInfo;
  subscriptionRecipeInfo: RecipeInfo[];
  memberCouponInfo: MemberCouponInfo[];
}

interface ChangePaymentMethodProps {
  onSuccess: () => void;
  onError: () => void;
}

interface CancelSubscriptionProps {
  reasonList: string[];
}

export type { 
  SubscriptionStatus,
  VisibleSubscribeStatus,
  SubscriptionItem,
  SubscriptionList,
  RecipeInfo,
  SubscriptionDetail,
  ChangePaymentMethodProps,
  CancelSubscriptionProps,
};