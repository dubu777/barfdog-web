import * as styles from "./BundleDeliverySelector.css";

interface BundleDeliverySelectorProps {
  isBundleDelivery: boolean;
  setIsBundleDelivery: (isBundleDelivery: boolean) => void;
}

export function BundleDeliverySelector({isBundleDelivery, setIsBundleDelivery}: BundleDeliverySelectorProps) {

  return (
    <div className={styles.bundleDeliverySelectorContainer}>
      <div onClick={() => setIsBundleDelivery(true)} className={styles.bundleDeliverySelectorBox({isSelected: isBundleDelivery})}>정기 구독 배송시 묶음 배송 신청</div>
      <div onClick={() => setIsBundleDelivery(false)} className={styles.bundleDeliverySelectorBox({isSelected: !isBundleDelivery})}>단품 주문으로 별도 배송 신청</div>
    </div>
  );
}