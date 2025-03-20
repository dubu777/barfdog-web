import { Coupon } from "@/types";
import * as styles from "./NewCouponCard.css";
import LabeledRadioButton from "@/components/common/labeledRadioButton/LabeledRadioButton";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { formatDateToKorean, formatNumberWithCommas } from "@/utils";
import { calculateCouponDiscount } from "@/utils/coupon/couponUtil";
import { useDiscountStore } from "@/store/order/useDiscountStore";

interface NewCouponCardProps {
  coupon: Coupon;
  isSelected: boolean;
  orderPrice: number;
  onToggle: (value: number) => void;
}

export default function NewCouponCard({
  coupon,
  isSelected,
  orderPrice,
  onToggle,
}: NewCouponCardProps) {
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

  const discountText =
    discountType === "FIXED_RATE"
      ? `${formatNumberWithCommas(discountAmount)}원 ${discountDegree}%`
      : `${formatNumberWithCommas(discountAmount)}원`;

  return (
    <div className={styles.couponCardContainer({isSelected})}>
      <LabeledRadioButton
        value={memberCouponId}
        isChecked={isSelected}
        onToggle={onToggle}
        optionType="selection"
        iconSize={32}
      >
        <div className={styles.couponCardWrapper} style={{ gap: "4px" }}>
          <DefaultText type="title1">{discountText}</DefaultText>
          <div className={styles.couponCardWrapper} style={{marginBottom: "12px"}}>
            <DefaultText type="label1" color="gray700">{name}</DefaultText>
            {discountType === "FIXED_RATE" && (
              <DefaultText type="body3" color="gray600">
                (최대 {formatNumberWithCommas(maxAvailableDiscount)}원 할인)
              </DefaultText>
            )}
          </div>
          <div className={styles.couponCardWrapper}>
            <DefaultText type="caption" color="gray500">
              {formatNumberWithCommas(availableMinPrice)}원 이상 구매시
            </DefaultText>
            <DefaultText type="caption" color="gray500">
              {formatDateToKorean(expiredDate)}까지
            </DefaultText>
          </div>
        </div>
      </LabeledRadioButton>
    </div>
  );
}
