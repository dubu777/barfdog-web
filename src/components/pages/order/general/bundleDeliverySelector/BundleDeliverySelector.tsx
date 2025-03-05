import * as styles from "./BundleDeliverySelector.css";
import { orderSheetWrapper } from "../../OrderSheetCommon.css";
import { initialDeliveryDto } from "@/config/orderInitialValues";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import { DeliveryDto } from "@/types";

interface BundleDeliverySelectorProps {
  deliveryId: number | null;
  deliveryDto: DeliveryDto;
}

export default function BundleDeliverySelector({deliveryId, deliveryDto}: BundleDeliverySelectorProps) {
  const {isBundleDelivery, setIsBundleDelivery, setDeliveryDto, setDeliveryId} = useDeliveryStore();

const handleBundleClick = () => {
  setIsBundleDelivery(true);
  setDeliveryDto(initialDeliveryDto);
  setDeliveryId(deliveryId)
}
const handleSingleClick = () => {
  setIsBundleDelivery(false)
  setDeliveryDto(deliveryDto)
  setDeliveryId(null)
}
  return ( 
    <div className={orderSheetWrapper}>
      <div className={styles.bundleDeliverySelectorContainer}>
      <div onClick={handleBundleClick} className={styles.bundleDeliverySelectorBox({isSelected: isBundleDelivery})}>정기 구독 배송시 묶음 배송 신청</div>
      <div onClick={handleSingleClick} className={styles.bundleDeliverySelectorBox({isSelected: !isBundleDelivery})}>단품 주문으로 별도 배송 신청</div>
      </div>
    </div>
  );
}