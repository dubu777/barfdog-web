import { Coupon, OrderType } from "@/types";
import * as styles from "./CouponCard.css";
import LabeledRadioButton from "@/components/common/labeledRadioButton/LabeledRadioButton";
import CouponContent from "@/components/common/modal/couponModal/couponContent/CouponContent";
import {
  calculateCouponDiscount,
  isCouponUsable,
} from "@/utils/coupon/couponUtils";

interface CouponCardProps {
  coupon: Coupon;
  orderType: OrderType;
  isSelected: boolean;
  orderPrice: number;
  maxAvailableCouponDiscount: number;
  onToggle: (value: number) => void;
}

export default function CouponCard({
  coupon,
  orderType,
  isSelected,
  orderPrice,
  maxAvailableCouponDiscount,
  onToggle,
}: CouponCardProps) {
  const {
    id,
    discountDegree,
    discountType,
    availableMinPrice,
    expiredDate,
    name,
  } = coupon;

  const { discountBasedOnCoupon } = calculateCouponDiscount(
    orderPrice,
    coupon,
    maxAvailableCouponDiscount
  );
  const { usable, reasons } = isCouponUsable(coupon, orderPrice, orderType);

  return (
    <div className={styles.couponCardContainer({ isSelected })}>
      <LabeledRadioButton
        value={id}
        isChecked={isSelected}
        onToggle={!usable ? () => {} : onToggle}
        optionType="selection"
        iconSize={32}
      >
        <CouponContent
          coupon={coupon}
          usable={usable}
          name={name}
          availableMinPrice={availableMinPrice}
          discountDegree={discountDegree}
          discountType={discountType}
          discountBasedOnCoupon={discountBasedOnCoupon}
          expiredDate={expiredDate}
          reasons={reasons}
        />
      </LabeledRadioButton>
    </div>
  );
}
