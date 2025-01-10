"use client";

import * as styles from "./OrderInfo.css";
import useModal from "@/hooks/useModal";
import {
  DeliveryDto,
  GeneralOrderSheetResponse,
  OrderType,
  SubscriptionOrderSheetResponse,
} from "@/types";
import { Suspense, useState } from "react";
import { useOrderStore } from "@/store/useOrderStore";
import { ErrorBoundary } from "react-error-boundary";
import { ORDER_TYPE } from "@/constants";
import DeliveryAddressModal from "../deliveryAddressModal/DeliveryAddressModal";
import CouponModal from "../couponModal/CouponModal";

interface OrderInfoProps {
  orderType: OrderType;
  generalOrderSheetData?: GeneralOrderSheetResponse | null;
  subscriptionOrderSheetData?: SubscriptionOrderSheetResponse | null;
  deliveryDto: DeliveryDto;
}

export default function OrderInfo({
  orderType,
  generalOrderSheetData,
  subscriptionOrderSheetData,
  deliveryDto,
}: OrderInfoProps) {
  // 상태관리
  const [selectedItemPrice, setSelectedItemPrice] = useState<number>(0);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const {
    getAppliedCouponDiscount,
    cancelAppliedCoupon,
    getRequestBody,
    isBundleDelivery,
    generalOrderBody,
    subscriptionOrderBody,
  } = useOrderStore();
  console.log("generalOrderBody", generalOrderBody);
  console.log("subscriptionOrderBody", subscriptionOrderBody);

  // 쿠폰 데이터 결정
  const couponData =
    orderType === ORDER_TYPE.GENERAL
      ? generalOrderSheetData?.coupons ?? []
      : subscriptionOrderSheetData?.coupons ?? [];

  // 모달 상태 훅
  const {
    isOpen: isDeliveryModalOpen,
    onToggle: toggleDeliveryModal,
    onClose: closeDeliveryModal,
  } = useModal();

  const {
    isOpen: isCouponModalOpen,
    onToggle: toggleCouponModal,
    onClose: closeCouponModal,
  } = useModal();

  // 일반 결제 쿠폰 적용/변경 버튼 클릭 함수
  const handleGeneralCouponButtonClick = (
    itemPrice: number,
    itemId: number
  ) => {
    const appliedDiscount = !!getAppliedCouponDiscount(itemId); // 쿠폰이 적용되어 있는지 확인
    if (appliedDiscount) {
      // 쿠폰이 적용되어 있다면 취소
      cancelAppliedCoupon(orderType, itemId);
      toggleCouponModal();
    } else {
      // 쿠폰이 적용되어 있지 않다면 쿠폰 모달 오픈
      setSelectedItemPrice(itemPrice);
      setSelectedItemId(itemId);
      toggleCouponModal();
    }
  };

  // 구독 결제 쿠폰 적용/변경 버튼 클릭 함수
  const isAppliedCoupon = !!subscriptionOrderBody.memberCouponId;
  const handleSubscriptionCouponButtonClick = (itemPrice: number) => {
    if (isAppliedCoupon) {
      cancelAppliedCoupon(orderType, null);
      toggleCouponModal();
    } else {
      setSelectedItemPrice(itemPrice);
      toggleCouponModal();
    }
  };

  return (
    <div className={styles.orderInfoContainer}>
      <h1>주문/결제</h1>
      <div className={styles.orderListBox} >
        {isBundleDelivery ? (
          <div>묶음 배송지로 배송됩니다.</div>
        ) : (
          <div>
          <div>
            {deliveryDto.name}
          </div>
          <div>
            {deliveryDto.street}
          </div>
          <div>
            {deliveryDto.zipcode}
          </div>
          <div>
            {deliveryDto.detailAddress}
          </div>
          <div>
            {deliveryDto.phone}
          </div>
          <button className={styles.addressButton} onClick={toggleDeliveryModal}>배송지 변경</button>
          </div>
        )}

      </div>
      {orderType === ORDER_TYPE.GENERAL && generalOrderSheetData && (
        <div className={styles.gridContainer}>
          <div className={styles.gridHeader}>
            <div>상품 정보</div>
            <div>수량</div>
            <div>총 주문 금액</div>
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

      {orderType === ORDER_TYPE.SUBSCRIPTION && subscriptionOrderSheetData && (
        <div className={styles.subscriptionItemWrapper}>
          {subscriptionOrderSheetData.recipeNameList.map((orderItem) => (
            <div className={styles.subscriptionItemWrapper} key={orderItem}>
              {orderItem}
            </div>
          ))}
          <div>
            <button
              className={styles.couponButton({ isApplied: isAppliedCoupon })}
              onClick={() =>
                handleSubscriptionCouponButtonClick(
                  subscriptionOrderSheetData.subscribeDto.nextPaymentPrice
                )
              }
            >
              쿠폰 적용
            </button>
          </div>
        </div>
      )}
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        {/* 로딩 컴포넌트 개발 예정 */}
        <Suspense fallback={<div>Loading...</div>}>
          <DeliveryAddressModal
            orderType={orderType}
            isVisible={isDeliveryModalOpen}
            onClose={closeDeliveryModal}
          />
        </Suspense>
      </ErrorBoundary>
      <CouponModal
        isVisible={isCouponModalOpen}
        onClose={closeCouponModal}
        selectedItemPrice={selectedItemPrice}
        selectedItemId={selectedItemId}
        couponData={couponData}
        orderType={orderType}
      />
    </div>
  );
}
