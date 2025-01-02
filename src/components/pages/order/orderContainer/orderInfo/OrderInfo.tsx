"use client";

import * as styles from "./OrderInfo.css";
import useModal from "@/hooks/useModal";
import DeliveryAddressModal from "./deliveryAddressModal/DeliveryAddressModal";
import { GeneralOrderSheetResponse } from "@/types";
import CouponModal from "./couponModal/CouponModal";
import { useState } from "react";
import { useOrderStore } from "@/store/useOrderStore";

interface OrderInfoProps {
  type: "general" | "subscription";
  generalOrderSheetData?: GeneralOrderSheetResponse | null;
}

export default function OrderInfo({
  type,
  generalOrderSheetData,
}: OrderInfoProps) {
  const [selectedItemPrice, setSelectedItemPrice] = useState<number>(0);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const {getAppliedCouponDiscount, generalOrderBody} = useOrderStore();
  console.log('generalOrderBody', generalOrderBody);
  
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

  const handleActiveCouponModal = (itemPrice: number, itemId: number) => {
    setSelectedItemPrice(itemPrice)
    setSelectedItemId(itemId)
    toggleCouponModal();
  }
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
              <div>{getAppliedCouponDiscount(orderItem.itemId) ? `-${getAppliedCouponDiscount(orderItem.itemId)}원` : "0원"}</div>
              <button
                className={styles.couponButton}
                onClick={()=> handleActiveCouponModal(orderItem.orderLinePrice, orderItem.itemId)}
              >
                쿠폰 적용
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
