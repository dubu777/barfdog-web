import { PlanKey, subscribeStatus } from "@/constants";

export type SubscribeStatusKey = keyof typeof subscribeStatus;

interface DefaultSubscribeDto {
  plan: string;
  dogName: string;
  countSkipOneTime: number;
  countSkipOneWeek: number;
  nextPaymentDate: string;
  nextPaymentPrice: number;
  discountCoupon: number;
  discountGrade: number;
  overDiscount: number;
  subscriptionMonth: number;
  nextDeliveryDate: string | null;
}

export interface SubscribeByIdDto extends DefaultSubscribeDto {
  id: number;
  subscribeStatus: SubscribeStatusKey;
  dogId: number;
  dogName: string;
  cancelReason?: null | string;
  subscribeCount: number;
  plan: PlanKey;
  oneMealGramsPerRecipe: string;
  oneDayRecommendKcal: number;
  usingMemberCouponId?: null | number;
  couponName?: null | string;
  previousOrderConfirmDate?: null | string;
}

export interface SubscribesDto extends DefaultSubscribeDto {
  subscribeId: number;
  pictureUrl?: null | string,
  status: SubscribeStatusKey;
  startDate: string;
  packagePrice: number;
  packageOriginalPrice: number;
  shippingLeft: number;
}


export interface SubscribeAddressData {
  currentAddress: AddressDto;
  nextAddress: AddressDto
  nextDeliveryDate: string;
}

export interface AddressDto {
  deliveryName?: null | string;
  recipientName: string;
  phoneNumber: string;
  zipcode: string;
  street: string;
  detailAddress: string;
  request?: null | string;
}

export interface ManageSubscribeData {
  itemNames: string;
  recipeNames: string;
  subscribeDto: SubscribesDto;
}

export interface BenefitDto {
  benefitExpiredDate: string;
  benefitId: number;
  benefitName: string;
  benefitRequestDate?: null | string | Date;
  benefitStatus: string;
  benefitUsedDate?: null | string | Date;
  benefitValue: number;
  subscribeId: number;
}

export type BenefitStatus = 'AVAILABLE' | 'REQUESTED' | 'USED';

export type SubscribeSkipType = 'ONCE' | 'WEEK';