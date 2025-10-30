import { useState } from "react";
import CouponModal from "@/components/common/modal/couponModal/CouponModal";
import { Coupon } from "@/types";
import { CouponCategory } from "@/types";
import { ORDER_TYPE } from "@/constants";
import { useFlattenedInfiniteData } from "@/hooks/useFlattenedInfiniteData";
import { useGetInfiniteCouponList } from "@/api/coupon/queries/useGetInfiniteCouponList";

interface ApplyCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  nextPaymentPrice: number;
}

export default function ApplyCouponModal({
  isOpen,
  onClose,
  nextPaymentPrice,
}: ApplyCouponModalProps) {
  const [couponCategory, setCouponCategory] = useState<CouponCategory>('NON_ALLIANCE');
  const { data } = useGetInfiniteCouponList(couponCategory);
  const couponList = useFlattenedInfiniteData(data, 'couponList');

  return (
    <CouponModal
      couponCategory={couponCategory}
      setCouponCategory={setCouponCategory}
      orderType={ORDER_TYPE.SUBSCRIPTION}
      coupons={couponList as Coupon[]}
      isOpen={isOpen}
      onClose={onClose}
      orderPrice={nextPaymentPrice}
    />
  );
}