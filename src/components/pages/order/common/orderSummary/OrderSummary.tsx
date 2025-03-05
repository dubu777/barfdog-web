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
    <div className={styles.orderSheetWrapper}>
      {orderType === ORDER_TYPE.SUBSCRIPTION ? (
        <>
          <div className={styles.orderSheetTitleWrapper}>
            <DefaultText type="title4">결제 금액</DefaultText>
          </div>
          <div
            className={styles.orderSheetContentWrapper({ direction: "col" })}
          >
            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">상품 금액</DefaultText>
              <DefaultText type="label2">
                {formatNumberWithCommas(orderPrice)}원
              </DefaultText>
            </div>

            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">배송비</DefaultText>
              <DefaultText type="label2">
                {deliveryFee === 0
                  ? "무료"
                  : `${formatNumberWithCommas(deliveryFee)}원`}
              </DefaultText>
            </div>
            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">플랜 할인</DefaultText>
              <DefaultText type="label2">
                {formatNumberWithCommas(planDiscount)}원
              </DefaultText>
            </div>
            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">등급 할인</DefaultText>
              <DefaultText type="label2">
                {formatNumberWithCommas(gradeDiscount)}원
              </DefaultText>
            </div>
            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">쿠폰 사용</DefaultText>
              <DefaultText type="label2">
                {formatNumberWithCommas(totalCouponDiscount)}원
              </DefaultText>
            </div>
            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">적립금 사용</DefaultText>
              <DefaultText type="label2">
                {formatNumberWithCommas(appliedReward)}원
              </DefaultText>
            </div>
            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">총 할인 금액</DefaultText>
              <DefaultText type="label2">
                {formatNumberWithCommas(totalDiscount)}원
              </DefaultText>
            </div>
            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">결제 금액</DefaultText>
              <DefaultText type="label2">
                {formatNumberWithCommas(finalPaymentAmount)}원
              </DefaultText>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.orderSheetTitleWrapper}>
            <DefaultText type="title4">결제 금액</DefaultText>
          </div>
          <div className={styles.orderSheetContentBox}>
            <DefaultText type="label2">상품 금액</DefaultText>
            <DefaultText type="label2">
              {formatNumberWithCommas(orderPrice)}원
            </DefaultText>
          </div>
          <div className={styles.orderSheetContentBox}>
            <DefaultText type="label2">배송비</DefaultText>
            <DefaultText type="label2">
              {deliveryFee === 0
                ? "무료"
                : `${formatNumberWithCommas(deliveryFee)}원`}
            </DefaultText>
          </div>

          <div className={styles.orderSheetContentBox}>
            <DefaultText type="label2">쿠폰 사용</DefaultText>
            <DefaultText type="label2">
              {formatNumberWithCommas(totalCouponDiscount)}원
            </DefaultText>
          </div>
          <div className={styles.orderSheetContentBox}>
            <DefaultText type="label2">적립금 사용</DefaultText>
            <DefaultText type="label2">
              {formatNumberWithCommas(appliedReward)}원
            </DefaultText>
          </div>
          <div className={styles.orderSheetContentBox}>
            <DefaultText type="label2">총 할인 금액</DefaultText>
            <DefaultText type="label2">
              {formatNumberWithCommas(totalDiscount)}원
            </DefaultText>
          </div>
          <div className={styles.orderSheetContentBox}>
            <DefaultText type="label2">결제 금액</DefaultText>
            <DefaultText type="label2">
              {formatNumberWithCommas(finalPaymentAmount)}원
            </DefaultText>
          </div>
        </>
      )}
    </div>
  );
}
