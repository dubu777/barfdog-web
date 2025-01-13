"use client";

import { orderCalculation } from "@/utils/order/orderCalculation";
import * as styles from "../OrderSheetCommon.css";
import { ORDER_TYPE } from "@/constants";
import { GeneralOrderItem, OrderType } from "@/types";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface OrderSummaryPropsProps {
  orderType: OrderType;
  orderPrice: number;
  userTotalReward: number;
  appliedReward: number;
  freeCondition?: number;
  deliveryPrice?: number;
  orderItemDtoList?: GeneralOrderItem[];
  plan?: string;
}

export default function OrderSummary({
  orderType,
  userTotalReward,
  appliedReward,
  orderPrice,
  freeCondition,
  deliveryPrice,
  orderItemDtoList,
  plan,
}: OrderSummaryPropsProps) {
  const {
    finalPaymentAmount,
    deliveryFee,
    gradeDiscount,
    maxRewardAmount,
    packageDiscount,
    totalCouponDiscount,
    totalDiscount,
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

  return (
    <div className={styles.orderSheetWrapper}>
      {orderType === ORDER_TYPE.SUBSCRIPTION ? (
        <>
          <div className={styles.orderSheetTitleWrapper}>
            <DefaultText type="title4">결제 금액</DefaultText>
          </div>
          <div className={styles.orderSheetContentWrapper}>
            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">총 금액</DefaultText>
              <DefaultText type="label2">{orderPrice}원</DefaultText>
            </div>
            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">총 할인 금액</DefaultText>
              <DefaultText type="label2">{totalDiscount}원</DefaultText>
            </div>
            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">배송비</DefaultText>
              <DefaultText type="label2">{deliveryFee}원</DefaultText>
            </div>
            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">플랜 할인</DefaultText>
              <DefaultText type="label2">원</DefaultText>
            </div>
            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">등급 할인</DefaultText>
              <DefaultText type="label2">{gradeDiscount}원</DefaultText>
            </div>
            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">쿠폰 사용</DefaultText>
              <DefaultText type="label2">{totalCouponDiscount}원</DefaultText>
            </div>
            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">패키지 할인</DefaultText>
              <DefaultText type="label2">{packageDiscount}원</DefaultText>
            </div>
            <div className={styles.orderSheetContentBox}>
              <DefaultText type="label2">적립금 사용</DefaultText>
              <DefaultText type="label2">{appliedReward}원</DefaultText>
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
            <DefaultText type="label2">{orderPrice}원</DefaultText>
          </div>
          <div className={styles.orderSheetContentBox}>
            <DefaultText type="label2">총 할인 금액</DefaultText>
            <DefaultText type="label2">{totalDiscount}원</DefaultText>
          </div>
          <div className={styles.orderSheetContentBox}>
            <DefaultText type="label2">배송비</DefaultText>
            <DefaultText type="label2">{deliveryFee}원</DefaultText>
          </div>
          <div className={styles.orderSheetContentBox}>
            <DefaultText type="label2">쿠폰 사용</DefaultText>
            <DefaultText type="label2">{totalCouponDiscount}원</DefaultText>
          </div>
          <div className={styles.orderSheetContentBox}>
            <DefaultText type="label2">적립금 사용</DefaultText>
            <DefaultText type="label2">{appliedReward}원</DefaultText>
          </div>
        </>
      )}
    </div>
  );
}
