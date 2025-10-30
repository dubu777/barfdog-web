import { useState } from "react";
import CouponModal from "@/components/domain/coupon/couponModal/CouponModal";
import { CouponCategory } from "@/types";
import { ORDER_TYPE } from "@/constants";
import { useFlattenedInfiniteData } from "@/hooks/useFlattenedInfiniteData";
import { useGetInfiniteCouponList } from "@/api/coupon/queries/useGetInfiniteCouponList";
import { ApplyNextPaymentCouponProps } from "@/types/mypage/subscription";
import { useCouponStore } from "@/store/checkout/useCouponStore";

interface NextPaymentCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  nextPaymentPrice: number;
  onApplyNextPaymentCoupon: (body: ApplyNextPaymentCouponProps) => void;
}

export default function NextPaymentCouponModal({
  isOpen,
  onClose,
  nextPaymentPrice,
  onApplyNextPaymentCoupon,
}: NextPaymentCouponModalProps) {
  const [couponCategory, setCouponCategory] = useState<CouponCategory>('NON_ALLIANCE');

  const { data } = useGetInfiniteCouponList(couponCategory);
  const couponList = useFlattenedInfiniteData(data, 'couponList');
  const cancelAppliedCoupon = useCouponStore(s => s.cancelAppliedCoupon);

  console.log('nextPaymentPrice', nextPaymentPrice);

  return (
    <CouponModal
      orderType={ORDER_TYPE.SUBSCRIPTION}
      coupons={couponList}
      isOpen={isOpen}
      onClose={onClose}
      orderPrice={nextPaymentPrice}
      couponCategory={couponCategory}
      setCouponCategory={setCouponCategory}
      onAfterApply={(body) => {
        onApplyNextPaymentCoupon({
          discount: body.discountAmount,
          memberCouponId: body.couponId,
          overDiscount: nextPaymentPrice > body.discountAmount ? 0 : nextPaymentPrice - body.discountAmount,
        })
        cancelAppliedCoupon();
        
      }}
    />
  );
}