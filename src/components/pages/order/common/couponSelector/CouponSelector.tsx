import OrderSection from "../orderSection/OrderSection";
import { getAvailableCoupons } from "@/utils/coupon/couponUtils";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { ORDER_MESSAGE, ORDER_TYPE } from "@/constants";
import * as styles from "./CouponSelector.css";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import ArrowIcon from "/public/images/header/chevron-right.svg";
import NewCouponModal from "./couponModal/NewCouponModal";
import useModal from "@/hooks/useModal";
import { useGetCouponList } from "@/api/mypage/queries/useGetCouponList";
import { OrderType } from "@/types";

interface CouponSelectorProps {
  orderPrice: number;
  orderType: OrderType;
}

export default function CouponSelector({
  orderPrice,
  orderType,
}: CouponSelectorProps) {
  const {data: coupons } = useGetCouponList();
  console.log('쿠폰 데이터', coupons);
  
  const { isOpen, onClose, onToggle } = useModal();
  const usableCouponCount = getAvailableCoupons(coupons, orderPrice, orderType).length;
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
          <DefaultText type="label1" color="gray500">
            {ORDER_MESSAGE.NO_AVAILABLE_COUPONS}
          </DefaultText>
        ) : (
          <DefaultText type="label1">
            사용 가능{" "}
            <DefaultText type="headline1" color="red">
              {usableCouponCount}장
            </DefaultText>
          </DefaultText>
        )}
        <SvgIcon src={ArrowIcon} size={20} color="gray600" />
      </div>
      {/* 쿠폰 모달 api 바뀌면 개발 예정 */}
      <NewCouponModal orderType={orderType} coupons={coupons} isOpen={isOpen} onClose={onClose} orderPrice={orderPrice}/>
    </OrderSection>
  );
}
