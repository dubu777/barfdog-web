import OrderSection from "../orderSection/OrderSection";
import { getAvailableCoupons } from "@/utils/coupon/couponUtils";
import Text from "@/components/common/text/Text";
import { ORDER_MESSAGE } from "@/constants";
import * as styles from "./CouponSelector.css";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import ArrowIcon from "/public/images/header/chevron-right.svg";
import useModal from "@/hooks/useModal";
import { useGetCouponList } from "@/api/mypage/queries/useGetCouponList";
import { OrderType } from "@/types";
import CouponModal from "@/components/common/modal/couponModal/CouponModal";

interface CouponSelectorProps {
  orderPrice: number;
  orderType: OrderType;
}

export default function CouponSelector({
  orderPrice,
  orderType,
}: CouponSelectorProps) {
  const { data: coupons } = useGetCouponList();

  const { isOpen, onClose, onToggle } = useModal();
  
  const usableCouponCount = getAvailableCoupons(
    coupons,
    orderPrice,
    orderType
  ).length;
  return (
    <OrderSection
      title="할인쿠폰"
      subTitleParts={[
        { text: `${coupons.length}`, color: "red" },
        { text: "장 보유", color: "gray700" },
      ]}
    >
      <div className={styles.couponSelectorBox} onClick={onToggle}>
        {usableCouponCount === 0 ? (
          <Text type="label1" color="gray500">
            {ORDER_MESSAGE.NO_AVAILABLE_COUPONS}
          </Text>
        ) : (
          <Text type="label1">
            사용 가능{" "}
            <Text type="headline1" color="red">
              {usableCouponCount}장
            </Text>
          </Text>
        )}
        <SvgIcon src={ArrowIcon} size={20} color="gray600" />
      </div>
      {/* 쿠폰 모달 api 바뀌면 개발 예정 */}
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
