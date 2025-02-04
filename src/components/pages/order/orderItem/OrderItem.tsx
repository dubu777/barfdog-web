"use client";

import * as styles from "./OrderItem.css";
import useModal from "@/hooks/useModal";
import {
  GeneralOrderSheetResponse,
  OrderType,
  SubscriptionOrderSheetResponse,
} from "@/types";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ORDER_TYPE } from "@/constants";
import CouponModal from "../couponModal/CouponModal";
import { orderSheetWrapper } from "../OrderSheetCommon.css";
import { useOrderStore } from "@/store/order/useOrderStore";

interface OrderItemProps {
  orderType: OrderType;
  generalOrderSheetData?: GeneralOrderSheetResponse | null;
  subscriptionOrderSheetData?: SubscriptionOrderSheetResponse | null;
}

export default function OrderItem({
  orderType,
  generalOrderSheetData,
  subscriptionOrderSheetData,
}: OrderItemProps) {
  // 상태관리
  const [selectedItemPrice, setSelectedItemPrice] = useState<number>(0);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const {
    subscriptionOrderBody,
    getAppliedCouponDiscount,
    cancelAppliedCoupon,
  } = useOrderStore();

  // 쿠폰 데이터 결정
  const couponData =
    orderType === ORDER_TYPE.GENERAL
      ? generalOrderSheetData?.coupons ?? []
      : subscriptionOrderSheetData?.coupons ?? [];

  const { isOpen, onToggle, onClose } = useModal();

  // 일반 결제 쿠폰 적용/변경 버튼 클릭 함수
  const handleGeneralCouponButtonClick = (
    itemPrice: number,
    itemId: number
  ) => {
    const appliedDiscount = !!getAppliedCouponDiscount(itemId); // 쿠폰이 적용되어 있는지 확인
    if (appliedDiscount) {
      // 쿠폰이 적용되어 있다면 취소
      cancelAppliedCoupon(orderType, itemId);
      onToggle();
    } else {
      // 쿠폰이 적용되어 있지 않다면 쿠폰 모달 오픈
      setSelectedItemPrice(itemPrice);
      setSelectedItemId(itemId);
      onToggle();
    }
  };

  // 구독 결제 쿠폰 적용/변경 버튼 클릭 함수
  const isAppliedCoupon = !!subscriptionOrderBody.memberCouponId;
  const handleSubscriptionCouponButtonClick = (itemPrice: number) => {
    if (isAppliedCoupon) {
      cancelAppliedCoupon(orderType, null);
      onToggle();
    } else {
      setSelectedItemPrice(itemPrice);
      onToggle();
    }
  };

  return (
    <div className={orderSheetWrapper}>
      <div className={styles.orderInfoContainer}>
        {orderType === ORDER_TYPE.GENERAL && generalOrderSheetData && (
          <div className={styles.gridContainer}>
            <div className={styles.gridHeader}>
              <div>상품 정보</div>
              <div>수량</div>
              <div>주문 금액</div>
              <div>쿠폰 할인</div>
              <div>쿠폰 적용</div>
            </div>
            {generalOrderSheetData.orderItemDtoList.map((orderItem) => (
              <div key={orderItem.itemId} className={styles.gridRow}>
                <div>
                  <div>{orderItem.name}</div>
                  {orderItem.optionDtoList?.map((option) => (
                    <div key={option.optionId}>
                      {option.name} {option.amount}개
                    </div>
                  ))}
                </div>
                <div>{orderItem.amount}개</div>
                <div>{orderItem.orderLinePrice}원</div>
                <div>
                  {!!getAppliedCouponDiscount(orderItem.itemId)
                    ? `-${getAppliedCouponDiscount(orderItem.itemId)}원`
                    : "0원"}
                </div>
                <div>
                  <button
                    className={styles.couponButton({
                      isApplied: !!getAppliedCouponDiscount(orderItem.itemId),
                    })}
                    onClick={() =>
                      handleGeneralCouponButtonClick(
                        orderItem.orderLinePrice,
                        orderItem.itemId
                      )
                    }
                  >
                    {!!getAppliedCouponDiscount(orderItem.itemId)
                      ? "쿠폰 변경"
                      : "쿠폰 적용"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {orderType === ORDER_TYPE.SUBSCRIPTION &&
          subscriptionOrderSheetData && (
            <div className={styles.subscriptionItemWrapper}>
              {subscriptionOrderSheetData.recipeNameList.map((orderItem) => (
                <div className={styles.subscriptionItemWrapper} key={orderItem}>
                  {orderItem}
                </div>
              ))}
                <button
                  className={styles.couponButton({
                    isApplied: isAppliedCoupon,
                  })}
                  onClick={() =>
                    handleSubscriptionCouponButtonClick(
                      subscriptionOrderSheetData.subscribeDto.nextPaymentPrice
                    )
                  }
                >
                  쿠폰 적용
                </button>
            </div>
          )}
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          <Suspense>
            <CouponModal
              isVisible={isOpen}
              onClose={onClose}
              selectedItemPrice={selectedItemPrice}
              selectedItemId={selectedItemId}
              couponData={couponData}
              orderType={orderType}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
