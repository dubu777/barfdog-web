
export interface SubscribeDto {
  id: number;
  subscribeStatus: string;
  dogId: number;
  dogName: string;
  cancelReason?: null | string;
  subscribeCount: number;
  plan: string;
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
  usingMemberCouponId?: null;
  couponName?: null;
  previousOrderConfirmDate?: null;
  subscriptionMonth?: null | number | string;
}
