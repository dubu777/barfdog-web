"use client";

import { orderCalculation } from "@/utils/order/orderCalculation";
import * as styles from "../OrderSheetCommon.css";
import { ORDER_TYPE } from "@/constants";
import { GeneralOrderItem, OrderType } from "@/types";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { formatNumberWithCommas } from "@/utils";
import { useEffect } from "react";
import { useRewardStore } from "@/store/order/useRewardStore";
import { useDiscountStore } from "@/store/order/useDiscountStore";

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
  const { userTotalReward, appliedReward } = useRewardStore();
  const {
    setPaymentPrice,
    setDeliveryPrice,
    setDiscountCoupon,
    setDiscountTotal,
    setMaxAvailableDiscount,
  } = useDiscountStore();
  const { setMaxAvailableReward } = useRewardStore();
  const {
    finalPaymentAmount,
    deliveryFee,
    gradeDiscount,
    totalCouponDiscount,
    totalDiscount,
    maxAvailableDiscount,
    maxAvailableReward,
  } = orderCalculation({
    orderType,
    userTotalReward,
    appliedReward,
    orderPrice,
    freeCondition,
    deliveryPrice,
    orderItemDtoList,
    plan,
  });

  useEffect(() => {
    setMaxAvailableDiscount(maxAvailableDiscount);
    setMaxAvailableReward(maxAvailableReward);
    setDeliveryPrice(deliveryFee);
    setDiscountCoupon(totalCouponDiscount);
    setDiscountTotal(totalDiscount);
    setPaymentPrice(finalPaymentAmount);
  }, [maxAvailableDiscount]);
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
              <DefaultText type="label2">총 금액</DefaultText>
              <DefaultText type="label2">
                {formatNumberWithCommas(orderPrice)}원
              </DefaultText>
            </div>
            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">총 할인 금액</DefaultText>
              <DefaultText type="label2">
                {formatNumberWithCommas(totalDiscount)}원
              </DefaultText>
            </div>
            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">배송비</DefaultText>
              <DefaultText type="label2">
                {formatNumberWithCommas(deliveryFee)}원
              </DefaultText>
            </div>
            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">플랜 할인</DefaultText>
              <DefaultText type="label2">원</DefaultText>
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
            <DefaultText type="label2">총 금액</DefaultText>
            <DefaultText type="label2">
              {formatNumberWithCommas(orderPrice)}원
            </DefaultText>
          </div>
          <div className={styles.orderSheetContentBox}>
            <DefaultText type="label2">총 할인 금액</DefaultText>
            <DefaultText type="label2">
              {formatNumberWithCommas(totalDiscount)}원
            </DefaultText>
          </div>
          <div className={styles.orderSheetContentBox}>
            <DefaultText type="label2">배송비</DefaultText>
            <DefaultText type="label2">
              {formatNumberWithCommas(deliveryFee)}원
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
