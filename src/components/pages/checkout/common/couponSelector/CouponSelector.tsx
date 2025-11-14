import * as styles from "./CouponSelector.css";
import { useState } from "react";
import ArrowIcon from "/public/images/header/chevron-right.svg";
import Text from "@/components/ui/text/Text";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import OrderSection from "../orderSection/OrderSection";
import CouponModal from "@/components/domain/coupon/couponModal/CouponModal";
import useModal from "@/hooks/useModal";
import { ORDER_MESSAGE } from "@/constants";
import { CouponCategory, OrderType } from "@/types";
import { getAvailableCoupons } from "@/utils/coupon/couponUtils";
import { useCouponStore } from "@/store/checkout/useCouponStore";
import { useFlattenedInfiniteData } from "@/hooks/useFlattenedInfiniteData";
import { useGetInfiniteCouponList } from "@/api/coupon/queries/useGetInfiniteCouponList";

interface CouponSelectorProps {
  originalPrice: number;
  orderType: OrderType;
}

export default function CouponSelector({
  originalPrice,
  orderType,
}: CouponSelectorProps) {
  const [couponCategory, setCouponCategory] =
    useState<CouponCategory>("NON_ALLIANCE");

  const { data } = useGetInfiniteCouponList(couponCategory);
  const coupons = useFlattenedInfiniteData(data, "couponList");

  const appliedCoupon = useCouponStore((state) => state.appliedCoupon);
  const { isOpen, onClose, onToggle } = useModal();

  const usableCouponCount = getAvailableCoupons(
    coupons,
    originalPrice,
    orderType
  ).length;

  const renderCouponContent = () => {
    if (appliedCoupon) {
      return (
        <Text type="label1">
          <Text type="headline1" color="red">
            {appliedCoupon.appliedDiscountAmount.toLocaleString()}원
          </Text>{" "}
          할인
        </Text>
      );
    }

    if (usableCouponCount === 0) {
      return (
        <Text type="label1" color="gray500">
          {ORDER_MESSAGE.NO_AVAILABLE_COUPONS}
        </Text>
      );
    }

    return (
      <Text type="label1">
        사용 가능{" "}
        <Text type="headline1" color="red">
          {usableCouponCount}장
        </Text>
      </Text>
    );
  };

  return (
    <OrderSection
      title="할인쿠폰"
      subTitleParts={[
        { text: `${coupons.length}`, color: "red" },
        { text: "장 보유", color: "gray700" },
      ]}
    >
      <div className={styles.couponSelectorBox} onClick={onToggle}>
        {renderCouponContent()}
        <SvgIcon src={ArrowIcon} size={20} color="gray600" />
      </div>
      <CouponModal
        orderType={orderType}
        coupons={coupons}
        isOpen={isOpen}
        onClose={onClose}
        originalPrice={originalPrice}
        couponCategory={couponCategory}
        setCouponCategory={setCouponCategory}
      />
    </OrderSection>
  );
}
