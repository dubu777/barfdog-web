import * as styles from "./BundleDeliverySelector.css";
import { initialDeliveryDto } from "@/config/orderInitialValues";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import { BundleDeliveryAddress, DeliveryDto } from "@/types";
import OrderSection from "../../common/orderSection/OrderSection";
import { orderSummaryRowContainer } from "../../common/orderSummary/orderSummaryRow/OrderSummaryRow.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { ORDER_MESSAGE } from "@/constants";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import { useToggleOption } from "@/hooks/useToggleOption";

interface BundleDeliverySelectorProps {
  bundleDeliveryAddress: BundleDeliveryAddress;
}

export default function BundleDeliverySelector({
  bundleDeliveryAddress
}: BundleDeliverySelectorProps) {
  const {
    isBundleDelivery,
    backupDeliveryDto,
    setIsBundleDelivery,
    setDeliveryDto,
    setDeliveryId,
  } = useDeliveryStore();
  
  // 묶음 배송
  const handleBundleDelivery = () => {
    setIsBundleDelivery(true);
    setDeliveryDto(initialDeliveryDto);
    setDeliveryId(bundleDeliveryAddress.id);
  };
  // 일반 배송 
  const handleDefaultDelivery = () => {
    setIsBundleDelivery(false);
    setDeliveryDto(backupDeliveryDto);
    setDeliveryId(null);
  };


  const { onToggle, isSelected } = useToggleOption<boolean>(
    isBundleDelivery,
    "checkbox",
    (newVal) => {
      if (newVal) {
        handleBundleDelivery();
      } else {
        handleDefaultDelivery();
      }
    }
  );

  return (
    <OrderSection title="배송 일정">
      <div className={orderSummaryRowContainer}>
        <DefaultText type="body2" color="gray700">
          배송 예정일
        </DefaultText>
        <DefaultText type="label2">주문 후 1-2일 이내 발송 예정</DefaultText>
      </div>
      <div
        className={styles.bundleDeliveryBox({
          isSelected: isBundleDelivery,
        })}
      >
        <LabeledCheckbox
          value={true}
          isChecked={isSelected(true)}
          onToggle={() => onToggle(true)}
        >
          <div className={styles.bundleDeliveryContentWrapper}>
            <DefaultText type="headline2">
              {ORDER_MESSAGE.SUBSCRIPTION_TITLE}
            </DefaultText>
            <DefaultText type="body3">
              {ORDER_MESSAGE.SUBSCRIPTION_SUBTITLE}
            </DefaultText>
          </div>
        </LabeledCheckbox>
      </div>
    </OrderSection>
  );
}
