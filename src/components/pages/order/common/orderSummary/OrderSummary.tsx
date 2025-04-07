"use client";

import { orderCalculation } from "@/utils/order/orderCalculation";
import * as styles from "../../OrderSheetCommon.css";
import { ORDER_TYPE } from "@/constants";
import { GeneralOrderItem, OrderType } from "@/types";
import { formatNumberWithCommas } from "@/utils";
import { useEffect, useMemo } from "react";
import { useRewardStore } from "@/store/order/useRewardStore";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import OrderSection from "../orderSection/OrderSection";
import OrderSummaryRow from "./orderSummaryRow/OrderSummaryRow";
import Divider from "@/components/common/divider/Divider";
import { useCouponStore } from "@/store/order/useCouponStore";
import InfoBox from "@/components/common/infoBox/InfoBox";
import { usePaymentStore } from "@/store/order/usePaymentStore";
import { orderSummaryRowContainer } from "./orderSummaryRow/OrderSummaryRow.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import HelpIcon from "public/images/icons/help.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { nextPaymentTextWrapper } from "./OrderSummary.css";
import NextPaymentBottomSheet from "../bottomSheet/nextPaymentBottomSheet/NextPaymentBottomSheet";
import useModal from "@/hooks/useModal";

interface OrderSummaryPropsProps {
  orderType: OrderType;
  originPrice: number; // 원금
  appliedDefaultDiscountPrice: number; // 일반 주문: (원금 - 상품 할인금액) , 구독 주문: (원금 - 플랜 할인금액)  => 이 가격에 쿠폰 및 등급할인을 적용한다.
  freeCondition?: number; // 배송비 무료를 위한 최소 금액
  deliveryPrice?: number;
  discountGrade?: number; // 등급 할인 금액
  orderItemDtoList?: GeneralOrderItem[];
  plan?: string;
}

export default function OrderSummary({
  orderType,
  originPrice,
  appliedDefaultDiscountPrice,
  freeCondition,
  deliveryPrice,
  discountGrade,
  orderItemDtoList,
  plan,
}: OrderSummaryPropsProps) {
  const { userTotalReward, appliedReward, setMaxAvailableReward } =
    useRewardStore();
  const { appliedCoupon, setMaxAvailableCouponDiscount } = useCouponStore();
  const {
    setPaymentPrice,
    setDeliveryPrice,
    setDiscountTotal,
    setDiscountPlan,
  } = usePaymentStore();
  const isBundleDelivery = useDeliveryStore((state) => state.isBundleDelivery);

  const calculation = useMemo(() => {
    return orderCalculation({
      orderType,
      discountGrade,
      isBundleDelivery,
      userTotalReward,
      appliedReward,
      orderPrice: appliedDefaultDiscountPrice,
      freeCondition,
      deliveryPrice,
      orderItemDtoList,
      discountCouponAmount: appliedCoupon?.discountAmount,
      plan,
    });
  }, [
    orderType,
    discountGrade,
    isBundleDelivery,
    userTotalReward,
    appliedReward,
    appliedDefaultDiscountPrice,
    freeCondition,
    deliveryPrice,
    orderItemDtoList,
    appliedCoupon,
    plan,
  ]);

  const {
    finalPaymentAmount,
    deliveryFee,
    gradeDiscount,
    planDiscount,
    totalDiscount,
    totalDiscountWithoutPlan,
    maxAvailableReward,
    maxAvailableCoupon,
  } = calculation;

  useEffect(() => {
    setMaxAvailableCouponDiscount(maxAvailableCoupon);
    setMaxAvailableReward(maxAvailableReward);
    setDeliveryPrice(deliveryFee);
    // 현재 서버에는 플랜 할인이 포함되지 않은 할인 금액을 보내야 함
    setDiscountTotal(totalDiscountWithoutPlan);
    setDiscountPlan(planDiscount);
    setPaymentPrice(finalPaymentAmount);
  }, [maxAvailableCoupon, maxAvailableReward, finalPaymentAmount]);
  const itemDiscountAmount = originPrice - appliedDefaultDiscountPrice;
  const { isOpen, onClose, onToggle } = useModal();

  return (
    <OrderSection title="결제 금액">
      {orderType === ORDER_TYPE.SUBSCRIPTION ? (
        <div className={styles.orderCommonWrapper({ direction: "col" })}>
          <OrderSummaryRow
            label="총 금액"
            value={originPrice}
            valueType="headline2"
            plainColor
            plus
          />
          <OrderSummaryRow label="할인 혜택" value={planDiscount} />
          <OrderSummaryRow label="배송비" value={deliveryFee} freeText="무료" />
          <OrderSummaryRow label="등급 할인" value={gradeDiscount} />
          <OrderSummaryRow
            label="쿠폰 사용"
            value={appliedCoupon?.discountAmount ?? 0}
          />
          <OrderSummaryRow label="적립금 사용" value={appliedReward} />
          <Divider thickness={2} color="gray300" />
          <OrderSummaryRow
            label="1회차 결제 금액"
            labelColor="gray900"
            value={finalPaymentAmount}
            valueType="title4"
            plus
          />
          {totalDiscount > 0 && (
            <InfoBox
              text={`총 ${formatNumberWithCommas(
                totalDiscount
              )}원 할인 받았어요!`}
              color="blue"
              fullWidth
            />
          )}
          <div className={orderSummaryRowContainer}>
            <div className={nextPaymentTextWrapper}>
              <DefaultText type="label4" color="gray700">
                2회차 예상 결제 금액
              </DefaultText>
              <SvgIcon src={HelpIcon} color="gray700" onClick={() => onToggle()} />
            </div>
            <DefaultText type="headline2" color="gray700">
              {formatNumberWithCommas(7777)}원
            </DefaultText>
          </div>
        </div>
      ) : (
        <div className={styles.orderCommonWrapper({ direction: "col" })}>
          <OrderSummaryRow
            label="총 금액"
            value={originPrice}
            valueType="headline2"
            plainColor
            plus
          />
          <OrderSummaryRow label="상품 할인" value={itemDiscountAmount} />
          <OrderSummaryRow
            label="배송비"
            value={deliveryFee}
            freeText="무료"
            plainColor
            plus
          />
          <OrderSummaryRow
            label="쿠폰 사용"
            value={appliedCoupon?.discountAmount ?? 0}
          />
          <OrderSummaryRow label="적립금 사용" value={appliedReward} />
          <Divider thickness={1} color="gray300" />
          <OrderSummaryRow
            label="결제 금액"
            value={finalPaymentAmount}
            labelType="label2"
            valueType="title4"
            plus
          />
          {totalDiscount > 0 && (
            <InfoBox
              text={`총 ${formatNumberWithCommas(
                totalDiscount
              )}원 할인 받았어요!`}
              color="blue"
              fullWidth
            />
          )}
        </div>
      )}
      <NextPaymentBottomSheet isOpen={isOpen} onClose={onClose} />
    </OrderSection>
  );
}
