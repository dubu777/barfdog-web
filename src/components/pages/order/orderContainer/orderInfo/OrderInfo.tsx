"use client";

import * as styles from "./OrderInfo.css";
import useModal from "@/hooks/useModal";
import DeliveryAddressModal from "./deliveryAddressModal/DeliveryAddressModal";

interface OrderInfoProps {}

export default function OrderInfo({}: OrderInfoProps) {
  const { isOpen, onToggle, onClose } = useModal();

  return (
    <div className={styles.OrderInfoContainer}>
      <h1>주문/결제</h1>
      <div className={styles.OrderListBox} onClick={onToggle}>
        배송지
      </div>
      <div className={styles.OrderListBox}>
        주문 상품
      </div>
      <DeliveryAddressModal
        isVisible={isOpen}
        onClose={onClose}
      />
    </div>
  );
}
