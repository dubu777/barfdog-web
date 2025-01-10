"use client";

import { orderCalculation } from "@/utils/order/orderCalculation";
import * as styles from "./OrderSummary.css";
import { ORDER_TYPE } from "@/constants";
import {
  GeneralOrderSheetResponse,
  OrderType,
  SubscriptionOrderSheetResponse,
} from "@/types";

interface OrderSummaryPropsProps {
  orderType: OrderType;
  generalOrderSheetData?: GeneralOrderSheetResponse;
  subscriptionOrderSheetData?: SubscriptionOrderSheetResponse;
  orderPrice: number;
  userTotalReward: number;
  appliedReward: number;
}

export default function OrderSummary({
  orderType,
  generalOrderSheetData,
  subscriptionOrderSheetData,
  userTotalReward,
  appliedReward,
  orderPrice,
}: OrderSummaryPropsProps) {
  const orderSummaryData = orderCalculation({
    orderType,
    generalOrderSheetData:
      orderType === ORDER_TYPE.GENERAL ? generalOrderSheetData : undefined,
    subscriptionOrderSheetData:
      orderType === ORDER_TYPE.SUBSCRIPTION
        ? subscriptionOrderSheetData
        : undefined,
    userTotalReward,
    appliedReward,
    orderPrice,
  });
  return (
    <div className={styles.orderSummaryContainer}>
      <h2>결제 금액</h2>
      <div className={styles.orderContentWrapper}>
        <div className={styles.orderContentBox}>
          <span>총 금액</span>
          <span>000원</span>
        </div>
        <div className={styles.orderContentBox}>
          <span>플랜 할인</span>
          <span>000원</span>
        </div>
        <div className={styles.orderContentBox}>
          <span>등급 할인</span>
          <span>000원</span>
        </div>
        <div className={styles.orderContentBox}>
          <span>쿠폰 사용</span>
          <span>000원</span>
        </div>
        <div className={styles.orderContentBox}>
          <span>적립금 사용</span>
          <span>000원</span>
        </div>
      </div>
    </div>
  );
}
