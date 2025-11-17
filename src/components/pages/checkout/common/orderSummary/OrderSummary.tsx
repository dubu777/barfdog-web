"use client";

import { orderCalculation } from "@/utils/checkout/orderCalculation";
import * as styles from "../../OrderSheetCommon.css";
import { ORDER_TYPE } from "@/constants";
import { GeneralOrderItem, OrderType } from "@/types";
import { formatNumberWithCommas } from "@/utils";
import { useEffect, useMemo } from "react";
import { useRewardStore } from "@/store/checkout/useRewardStore";
import { useDeliveryStore } from "@/store/checkout/useDeliveryStore";
import OrderSection from "../orderSection/OrderSection";
import OrderSummaryRow from "./orderSummaryRow/OrderSummaryRow";
import Divider from "@/components/ui/divider/Divider";
import { useCouponStore } from "@/store/checkout/useCouponStore";
import InfoBox from "@/components/ui/infoBox/InfoBox";
import { usePaymentStore } from "@/store/checkout/usePaymentStore";

interface OrderSummaryPropsProps {
  orderType: OrderType;
  originalPrice: number; // 원금
  discountPlan?: number; // 일반 주문: (원금 - 상품 할인금액) , 구독 주문: (원금 - 플랜 할인금액)  => 이 가격에 쿠폰 및 등급할인을 적용한다.
  discountItem?: number;
  freeCondition?: number; // 배송비 무료를 위한 최소 금액
  deliveryPrice?: number;
  discountGrade?: number; // 등급 할인 금액
  orderItemDtoList?: GeneralOrderItem[];
  plan?: string;
}

export default function OrderSummary({
  orderType,
  originalPrice,
  discountPlan = 0,
  discountItem = 0,
  freeCondition,
  deliveryPrice,
  discountGrade = 0,
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
    setOverDiscount,
  } = usePaymentStore();

  const isBundleDelivery = useDeliveryStore((state) => state.isBundleDelivery);
  const discountDefault =
    orderType === "SUBSCRIBE" ? discountPlan : discountItem;

  const calculation = useMemo(() => {
    return orderCalculation({
      discountGrade,
      isBundleDelivery,
      userTotalReward,
      appliedReward,
      originalPrice,
      discountDefault,
      freeCondition,
      deliveryPrice,
      orderItemDtoList,
      discountCoupon: appliedCoupon?.discountAmount,
      appliedCouponDiscount: appliedCoupon?.appliedDiscountAmount,
    });
  }, [
    orderType,
    discountGrade,
    isBundleDelivery,
    userTotalReward,
    appliedReward,
    discountPlan,
    discountItem,
    freeCondition,
    deliveryPrice,
    orderItemDtoList,
    appliedCoupon,
    plan,
    originalPrice,
  ]);

  const {
    finalPaymentAmount,
    deliveryFee,
    totalDiscount,
    maxAvailableReward,
    maxAvailableCoupon,
    overDiscount,
  } = calculation;

  useEffect(() => {
    setMaxAvailableCouponDiscount(maxAvailableCoupon);
    setMaxAvailableReward(maxAvailableReward);
    setDeliveryPrice(deliveryFee);
    setDiscountTotal(totalDiscount);
    setPaymentPrice(finalPaymentAmount);
    setOverDiscount(overDiscount);
  }, [
    maxAvailableCoupon,
    maxAvailableReward,
    deliveryFee,
    discountPlan,
    finalPaymentAmount,
    setMaxAvailableCouponDiscount,
    setMaxAvailableReward,
    setDeliveryPrice,
    setDiscountTotal,
    setPaymentPrice,
  ]);

  return (
    <OrderSection title="결제 금액">
      {orderType === ORDER_TYPE.SUBSCRIPTION ? (
        <div className={styles.orderCommonWrapper({ direction: "col" })}>
          <OrderSummaryRow
            label="구독 원가"
            value={originalPrice}
            valueType="headline2"
            plainColor
            plus
          />
          <OrderSummaryRow label="구독 할인" value={discountPlan} />
          <OrderSummaryRow label="등급 할인" value={discountGrade} />
          <OrderSummaryRow
            label="쿠폰 할인"
            value={appliedCoupon?.appliedDiscountAmount ?? 0}
          />
          <OrderSummaryRow label="적립금 할인" value={appliedReward} />
          <OrderSummaryRow label="배송비" value={deliveryFee} freeText="무료" />
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
        </div>
      ) : (
        <div className={styles.orderCommonWrapper({ direction: "col" })}>
          <OrderSummaryRow
            label="상품 금액"
            value={originalPrice}
            valueType="headline2"
            plainColor
            plus
          />
          <OrderSummaryRow label="상품 할인" value={discountItem} />
          <OrderSummaryRow
            label="쿠폰 할인"
            value={appliedCoupon?.appliedDiscountAmount ?? 0}
          />
          <OrderSummaryRow label="적립금 할인" value={appliedReward} />
          <OrderSummaryRow
            label="배송비"
            value={deliveryFee}
            freeText="무료"
            plainColor
            plus
          />
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
    </OrderSection>
  );
}
