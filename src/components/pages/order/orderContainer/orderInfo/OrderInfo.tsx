"use client";

import { useGetOrderSheet } from "@/api/order/queries/useGetOrderSheet";
import * as styles from "./OrderInfo.css";
import { useGetAddress } from "@/api/order/queries/useGetAddress";
import useModal from "@/hooks/useModal";
import DeliveryAddressModal from "./deliveryAddressModal/DeliveryAddressModal";

interface OrderInfoProps {}

export default function OrderInfo({}: OrderInfoProps) {
  const { isOpen, onToggle, onClose } = useModal();

  return (
    <div className={styles.OrderInfoContainer}>
      <div className={styles.OrderListBox} onClick={onToggle}>
        배송지
      </div>
      <DeliveryAddressModal
        isVisible={isOpen}
        onClose={onClose}
      />
    </div>
  );
}
