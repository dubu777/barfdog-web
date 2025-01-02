export type { CouponData, DiscountType, DiscountUnitType };

interface CouponData {
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
  discountType: DiscountType;
  expiredDate: string;
}

type DiscountType = 'FLAT_RATE' | 'FIXED_RATE';

type DiscountUnitType = '%' | '원';