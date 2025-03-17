import { Coupon } from "@/types";
import OrderSection from "../orderSection/OrderSection";
import { getAvailableCoupons } from "@/utils/coupon/couponUtil";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { ORDER_MESSAGE } from "@/constants";
import * as styles from "./CouponSelector.css";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import ArrowIcon from "/public/images/header/chevron-right.svg";

interface CouponSelectorProps {
  coupons: Coupon[];
  orderPrice: number;
}

export default function CouponSelector({
  coupons,
  orderPrice,
}: CouponSelectorProps) {
  const usableCouponCount = getAvailableCoupons(coupons, orderPrice).length;
  return (
    <OrderSection
      title="할인쿠폰"
      subTitleParts={[
        { text: `${coupons.length}`, color: "red" },
        { text: "장 보유", color: "gray700" },
      ]}
    >
      <div className={styles.couponSelectorBox}>
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
    </OrderSection>
  );
}
