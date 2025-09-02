import OrderSection from "../orderSection/OrderSection";
import { getAvailableCoupons } from "@/utils/coupon/couponUtils";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { ORDER_MESSAGE } from "@/constants";
import * as styles from "./CouponSelector.css";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import ArrowIcon from "/public/images/header/chevron-right.svg";
import useModal from "@/hooks/useModal";
import { useGetCouponList } from "@/api/mypage/queries/useGetCouponList";
import { OrderType } from "@/types";
import CouponModal from "@/components/common/modal/couponModal/CouponModal";
import { useCouponStore } from "@/store/order/useCouponStore";

interface CouponSelectorProps {
  orderPrice: number;
  orderType: OrderType;
}

export default function CouponSelector({
  orderPrice,
  orderType,
}: CouponSelectorProps) {
  const { data: coupons } = useGetCouponList();
  const appliedCoupon = useCouponStore((state) => state.appliedCoupon);
  const { isOpen, onClose, onToggle } = useModal();

  const usableCouponCount = getAvailableCoupons(
    coupons,
    orderPrice,
    orderType
  ).length;

  const renderCouponContent = () => {
    if (appliedCoupon) {
      return (
        <DefaultText type="label1">
          <DefaultText type="headline1" color="red">
            {appliedCoupon.discountAmount.toLocaleString()}원
          </DefaultText>{" "}
          할인
        </DefaultText>
      );
    }

    if (usableCouponCount === 0) {
      return (
        <DefaultText type="label1" color="gray500">
          {ORDER_MESSAGE.NO_AVAILABLE_COUPONS}
        </DefaultText>
      );
    }

    return (
      <DefaultText type="label1">
        사용 가능{" "}
        <DefaultText type="headline1" color="red">
          {usableCouponCount}장
        </DefaultText>
      </DefaultText>
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
        orderPrice={orderPrice}
      />
    </OrderSection>
  );
}
