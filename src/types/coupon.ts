export interface CouponData {
  id: number;
  name: string;
  status: string;
  amount: number;
  remaining: number;
  availableMaxDiscount: number;
  availableMinPrice: number;
  couponTarget: string;
  description: string;
  discountDegree: number;
  discountType: string;
  expiredDate: string | Date;
}