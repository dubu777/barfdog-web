import { Coupon, CouponData, OrderType } from "@/types";
import * as styles from "./CouponCard.css";
import LabeledRadioButton from "@/components/common/labeledRadioButton/LabeledRadioButton";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { formatDateToKorean, formatNumberWithCommas } from "@/utils";
import {
  calculateCouponDiscount,
  getCouponTargetText,
  isCouponUsable,
} from "@/utils/coupon/couponUtils";
import { useDiscountStore } from "@/store/order/useDiscountStore";

interface CouponCardProps {
  coupon: Coupon;
  orderType: OrderType;
  isSelected: boolean;
  orderPrice: number;
  onToggle: (value: number) => void;
}

export default function CouponCard({
  coupon,
  orderType,
  isSelected,
  orderPrice,
  onToggle,
}: CouponCardProps) {
  const {
    memberCouponId,
    discountDegree,
    discountType,
    availableMinPrice,
    expiredDate,
    name,
  } = coupon;
  const maxAvailableDiscount = useDiscountStore(
    (state) => state.maxAvailableDiscount
  );
  const { discountAmount, exceededAvailableMexDiscount } =
    calculateCouponDiscount(orderPrice, coupon, maxAvailableDiscount);
  const { usable, reasons } = isCouponUsable(coupon, orderPrice, orderType);

  const discountText =
    discountType === "FIXED_RATE"
      ? `${formatNumberWithCommas(discountAmount)}원 (${discountDegree}%)`
      : `${formatNumberWithCommas(discountAmount)}원`;
  const couponTargetText = getCouponTargetText(coupon.couponTarget);
  return (
    <div className={styles.couponCardContainer({ isSelected })}>
      <LabeledRadioButton
        value={memberCouponId}
        isChecked={isSelected}
        onToggle={!usable ? () => {} : onToggle}
        optionType="selection"
        iconSize={32}
      >
        <div className={styles.couponCardWrapper} style={{ gap: "4px" }}>
          <DefaultText
            type="title1"
            color={!usable ? "gray400" : isSelected ? "red" : "gray900"}
          >
            {discountText}
          </DefaultText>
          <div
            className={styles.couponCardWrapper}
            style={{ marginBottom: "12px" }}
          >
            <DefaultText type="label1" color={!usable ? "gray400" : "gray700"}>
              {name}
            </DefaultText>
            {discountType === "FIXED_RATE" && (
              <DefaultText type="body3" color={!usable ? "gray400" : "gray600"}>
                (최대 {formatNumberWithCommas(coupon.availableMaxDiscount)}원
                할인)
              </DefaultText>
            )}
          </div>
          <div className={styles.couponCardWrapper}>
            <DefaultText
              type="caption"
              color={reasons.includes("minPrice") ? "red" : "gray600"}
            >
              {formatNumberWithCommas(availableMinPrice)}원 이상 구매시
            </DefaultText>
            <DefaultText type="caption" color="gray500">
              {formatDateToKorean(expiredDate)}까지 |{" "}
              <DefaultText
                type="caption"
                color={reasons.includes("orderType") ? "red" : "gray500"}
              >
                {couponTargetText}
              </DefaultText>
            </DefaultText>
          </div>
        </div>
      </LabeledRadioButton>
    </div>
  );
}
