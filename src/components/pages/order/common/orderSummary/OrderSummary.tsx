"use client";

import { orderCalculation } from "@/utils/order/orderCalculation";
import * as styles from "../../OrderSheetCommon.css";
import { ORDER_TYPE } from "@/constants";
import { GeneralOrderItem, OrderType } from "@/types";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { formatNumberWithCommas } from "@/utils";
import { useEffect, useMemo } from "react";
import { useRewardStore } from "@/store/order/useRewardStore";
import { useDiscountStore } from "@/store/order/useDiscountStore";
import { useOrderStore } from "@/store/order/useOrderStore";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import OrderSection from "../orderSection/OrderSection";
import OrderSummaryRow from "./orderSummaryRow/OrderSummaryRow";
import Divider from "@/components/common/divider/Divider";

interface OrderSummaryPropsProps {
  orderType: OrderType;
  orderPrice: number;
  freeCondition?: number;
  deliveryPrice?: number;
  orderItemDtoList?: GeneralOrderItem[];
  plan?: string;
}

export default function OrderSummary({
  orderType,
  orderPrice,
  freeCondition,
  deliveryPrice,
  orderItemDtoList,
  plan,
}: OrderSummaryPropsProps) {
  const { userTotalReward, appliedReward, setMaxAvailableReward } =
    useRewardStore();
  const { generalOrderBody, subscriptionOrderBody } = useOrderStore();
  const {
    setPaymentPrice,
    setDeliveryPrice,
    setDiscountCoupon,
    setDiscountTotal,
    setMaxAvailableDiscount,
    setDiscountPlan,
  } = useDiscountStore();
  const { isBundleDelivery } = useDeliveryStore();

  const calculation = useMemo(() => {
    return orderCalculation({
      orderType,
      generalOrderBody,
      subscriptionOrderBody,
      isBundleDelivery,
      userTotalReward,
      appliedReward,
      orderPrice,
      freeCondition,
      deliveryPrice,
      orderItemDtoList,
      plan,
    });
  }, [
    orderType,
    generalOrderBody,
    subscriptionOrderBody,
    isBundleDelivery,
    userTotalReward,
    appliedReward,
    orderPrice,
    freeCondition,
    deliveryPrice,
    orderItemDtoList,
    plan,
  ]);

  const {
    finalPaymentAmount,
    deliveryFee,
    gradeDiscount,
    planDiscount,
    totalCouponDiscount,
    totalDiscount,
    totalDiscountWithoutPlan,
    maxAvailableDiscount,
    maxAvailableReward,
  } = calculation;

  useEffect(() => {
    setMaxAvailableDiscount(maxAvailableDiscount);
    setMaxAvailableReward(maxAvailableReward);
    setDeliveryPrice(deliveryFee);
    setDiscountCoupon(totalCouponDiscount);
    // 현재 서버에는 플랜 할인이 포함되지 않은 할인 금액을 보내야 함
    setDiscountTotal(totalDiscountWithoutPlan);
    setDiscountPlan(planDiscount);
    setPaymentPrice(finalPaymentAmount);
  }, [maxAvailableDiscount, maxAvailableReward, finalPaymentAmount]);
  return (
    <OrderSection title="결제 금액">
      {orderType === ORDER_TYPE.SUBSCRIPTION ? (
        <div className={styles.orderCommonWrapper({ direction: "col" })}>
          <OrderSummaryRow label="총 금액" value={orderPrice} valueType="headline2" plainColor plus/>
          <OrderSummaryRow label="배송비" value={deliveryFee} freeText="무료" />
          <OrderSummaryRow label="플랜 할인" value={planDiscount} />
          <OrderSummaryRow label="등급 할인" value={gradeDiscount} />
          <OrderSummaryRow label="쿠폰 사용" value={totalCouponDiscount} />
          <OrderSummaryRow label="적립금 사용" value={appliedReward} />
          <OrderSummaryRow label="총 할인 금액" value={totalDiscount} />
          <Divider thickness={1} color="gray300" /> 
          <OrderSummaryRow label="1회차 결제 금액" value={finalPaymentAmount} valueType="title4" plus />
        </div>
      ) : (
        <div className={styles.orderCommonWrapper({ direction: "col" })}>
          <OrderSummaryRow label="총 금액" value={orderPrice} plainColor/>
          <OrderSummaryRow label="배송비" value={deliveryFee} freeText="무료" />
          <OrderSummaryRow label="쿠폰 사용" value={totalCouponDiscount} />
          <OrderSummaryRow label="적립금 사용" value={appliedReward} />
          <OrderSummaryRow label="총 할인 금액" value={totalDiscount} />
          <OrderSummaryRow label="결제 금액" value={finalPaymentAmount} plus />
        </div>
      )}
    </OrderSection>
  );
}
