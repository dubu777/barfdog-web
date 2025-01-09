import { useOrderStore } from "@/store/useOrderStore";
import * as styles from "./BundleDeliverySelector.css";
import { initialDeliveryDto } from "@/constants";
import { useEffect } from "react";

interface BundleDeliverySelectorProps {

}

export function BundleDeliverySelector({}: BundleDeliverySelectorProps) {
  const {isBundleDelivery, setIsBundleDelivery, setDeliveryDto, setDeliveryId, generalOrderBody} = useOrderStore();
const handleBundleClick = () => {
  setIsBundleDelivery(true);
  setDeliveryDto(initialDeliveryDto);
  setDeliveryId(generalOrderBody.deliveryId)
}
const handleSingleClick = () => {
  setIsBundleDelivery(false)
  setDeliveryDto(generalOrderBody.deliveryDto)
  setDeliveryId(null)
}
  return ( 
    <div className={styles.bundleDeliverySelectorContainer}>
      <div onClick={handleBundleClick} className={styles.bundleDeliverySelectorBox({isSelected: isBundleDelivery})}>정기 구독 배송시 묶음 배송 신청</div>
      <div onClick={handleSingleClick} className={styles.bundleDeliverySelectorBox({isSelected: !isBundleDelivery})}>단품 주문으로 별도 배송 신청</div>
    </div>
  );
}