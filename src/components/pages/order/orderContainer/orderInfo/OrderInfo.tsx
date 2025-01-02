"use client";

import * as styles from "./OrderInfo.css";
import useModal from "@/hooks/useModal";
import DeliveryAddressModal from "./deliveryAddressModal/DeliveryAddressModal";
import { GeneralOrderSheetResponse } from "@/types";
import CouponModal from "./couponModal/CouponModal";
import { useEffect, useState } from "react";
import { useOrderStore } from "@/store/useOrderStore";

interface OrderInfoProps {
  type: "general" | "subscription";
  generalOrderSheetData?: GeneralOrderSheetResponse | null;
}

export default function OrderInfo({
  type,
  generalOrderSheetData,
}: OrderInfoProps) {
  // 상태관리
  const [selectedItemPrice, setSelectedItemPrice] = useState<number>(0);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const {
    getAppliedCouponDiscount,
    generalOrderBody,
    updateGeneralOrderBody,
    cancelAppliedCoupon,
  } = useOrderStore();
  console.log("generalOrderBody", generalOrderBody);

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

  // 쿠폰 적용/변경 버튼 클릭 함수
  const handleCouponButtonClick = (itemPrice: number, itemId: number) => {
    const appliedDiscount = getAppliedCouponDiscount(itemId); // 쿠폰이 적용되어 있는지 확인
    if (appliedDiscount) {
      // 쿠폰이 적용되어 있다면 취소
      cancelAppliedCoupon(itemId);
      toggleCouponModal();
    } else {
      // 쿠폰이 적용되어 있지 않다면 쿠폰 모달 오픈
      setSelectedItemPrice(itemPrice);
      setSelectedItemId(itemId);
      toggleCouponModal();
    }
  };
  return (
    <div className={styles.orderInfoContainer}>
      <h1>주문/결제</h1>
      <div className={styles.orderListBox} onClick={toggleDeliveryModal}>
        배송지
      </div>
      <div className={styles.orderItemListWrapper}>
        {generalOrderSheetData?.orderItemDtoList.map((orderItem) => (
          <div key={orderItem.itemId} className={styles.orderItemListWrapper}>
            <div className={styles.orderItemWrapper}>
              <div>{orderItem.name}</div>
              <div>{orderItem.amount}개</div>
              <div>{orderItem.orderLinePrice}원</div>
              <div>
                {getAppliedCouponDiscount(orderItem.itemId)
                  ? `-${getAppliedCouponDiscount(orderItem.itemId)}원`
                  : "0원"}
              </div>
              <button
                className={styles.couponButton}
                onClick={() =>
                  handleCouponButtonClick(
                    orderItem.orderLinePrice,
                    orderItem.itemId
                  )
                }
              >
                {getAppliedCouponDiscount(orderItem.itemId)
                  ? "쿠폰 변경"
                  : "쿠폰 적용"}
              </button>
            </div>
            <div>
              {orderItem.optionDtoList?.map((option) => (
                <div key={option.optionId}>
                  {option.name} {option.amount}개
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <DeliveryAddressModal
        isVisible={isDeliveryModalOpen}
        onClose={closeDeliveryModal}
      />
      <CouponModal
        isVisible={isCouponModalOpen}
        onClose={closeCouponModal}
        selectedItemPrice={selectedItemPrice}
        selectedItemId={selectedItemId}
        generalOrderSheetData={generalOrderSheetData}
        type={type}
      />
    </div>
  );
}
