import { Coupon } from "@/types";
import * as styles from "./NewCouponCard.css";
import LabeledRadioButton from "@/components/common/labeledRadioButton/LabeledRadioButton";

interface NewCouponCardProps {
  coupon: Coupon;
}

export default function NewCouponCard({coupon}: NewCouponCardProps) {


  return (
    <div className={styles.couponCardContainer}>
      {/* <LabeledRadioButton
                  value={}
                  isChecked={isSelected(value)}
                  onToggle={onToggle}
      >

      </LabeledRadioButton> */}
    </div>
  )
}