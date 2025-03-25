"use client";

import { orderCalculation } from "@/utils/order/orderCalculation";
import * as styles from "../../OrderSheetCommon.css";
import { ORDER_TYPE } from "@/constants";
import { GeneralOrderItem, OrderType } from "@/types";
import { formatNumberWithCommas } from "@/utils";
import { useEffect, useMemo } from "react";
import { useRewardStore } from "@/store/order/useRewardStore";
import { useDiscountStore } from "@/store/order/useDiscountStore";
import { useOrderStore } from "@/store/order/useOrderStore";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import OrderSection from "../orderSection/OrderSection";
import OrderSummaryRow from "./orderSummaryRow/OrderSummaryRow";
import Divider from "@/components/common/divider/Divider";
import { useCouponStore } from "@/store/order/useCouponStore";
import InfoBox from "@/components/common/infoBox/InfoBox";

interface OrderSummaryPropsProps {
  orderType: OrderType;
  originPrice: number;
  appliedDefaultDiscountPrice: number; // 일반 주문이라면 상품할인, 구독 주문이라면 플랜할인이 적용된 가격 - 이 가격에 쿠폰 및 등급할인을 적용한다.
  freeCondition?: number;
  deliveryPrice?: number;
  orderItemDtoList?: GeneralOrderItem[];
  plan?: string;
}

export default function OrderSummary({
  orderType,
  originPrice,
  appliedDefaultDiscountPrice,
  freeCondition,
  deliveryPrice,
  orderItemDtoList,
  plan,
}: OrderSummaryPropsProps) {
  const { userTotalReward, appliedReward, setMaxAvailableReward } =
    useRewardStore();
  const appliedCoupon = useCouponStore((state) => state.appliedCoupon);
  const subscriptionOrderBody = useOrderStore(
    (state) => state.subscriptionOrderBody
  );
  console.log("subscriptionOrderBody", subscriptionOrderBody);

  const {
    setPaymentPrice,
    setDeliveryPrice,
    setDiscountTotal,
    setMaxAvailableDiscount,
    setDiscountPlan,
  } = useDiscountStore();
  const isBundleDelivery = useDeliveryStore((state) => state.isBundleDelivery);

  const calculation = useMemo(() => {
    return orderCalculation({
      orderType,
      subscriptionOrderBody,
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
    subscriptionOrderBody,
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
    maxAvailableDiscount,
    maxAvailableReward,
  } = calculation;

  useEffect(() => {
    setMaxAvailableDiscount(maxAvailableDiscount);
    setMaxAvailableReward(maxAvailableReward);
    setDeliveryPrice(deliveryFee);
    // 현재 서버에는 플랜 할인이 포함되지 않은 할인 금액을 보내야 함
    setDiscountTotal(totalDiscountWithoutPlan);
    setDiscountPlan(planDiscount);
    setPaymentPrice(finalPaymentAmount);
  }, [maxAvailableDiscount, maxAvailableReward, finalPaymentAmount]);

  const itemDiscountAmount = originPrice - appliedDefaultDiscountPrice;
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
          <OrderSummaryRow label="배송비" value={deliveryFee} freeText="무료" />
          <OrderSummaryRow label="플랜 할인" value={planDiscount} />
          <OrderSummaryRow label="등급 할인" value={gradeDiscount} />
          <OrderSummaryRow
            label="쿠폰 사용"
            value={appliedCoupon?.discountAmount ?? 0}
          />
          <OrderSummaryRow label="적립금 사용" value={appliedReward} />
          <Divider thickness={1} color="gray300" />
          <OrderSummaryRow
            label="1회차 결제 금액"
            value={finalPaymentAmount}
            valueType="title4"
            plus
          />
          <div>
            {`총 ${formatNumberWithCommas(totalDiscount)}원 할인 받았어요!`}
          </div>
          <OrderSummaryRow
            label="2회차 예상 결제 금액"
            labelType="label4"
            value={finalPaymentAmount}
            valueType="headline2"
            valueColor="gray700"
            plus
          />
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
          <OrderSummaryRow label="배송비" value={deliveryFee} plainColor plus />
          <OrderSummaryRow
            label="쿠폰 사용"
            value={appliedCoupon?.discountAmount ?? 0}
          />
          <OrderSummaryRow label="적립금 사용" value={appliedReward} />
          <OrderSummaryRow label="결제 금액" value={finalPaymentAmount} plus />
          <Divider thickness={1} color="gray300" />
          <OrderSummaryRow
            label="결제 금액"
            value={finalPaymentAmount}
            valueType="title4"
            plus
          />
          <InfoBox
            text={`총 ${formatNumberWithCommas(
              totalDiscount
            )}원 할인 받았어요!`}
            color="blue"
            fullWidth
            style={{ marginTop: "8px" }}
          />
        </div>
      )}
    </OrderSection>
  );
}
