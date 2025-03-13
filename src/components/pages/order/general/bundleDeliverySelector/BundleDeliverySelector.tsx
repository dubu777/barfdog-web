import * as styles from "./BundleDeliverySelector.css";
import { initialDeliveryDto } from "@/config/orderInitialValues";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import { DeliveryDto } from "@/types";
import OrderSection from "../../common/orderSection/OrderSection";
import { orderSummaryRowContainer } from "../../common/orderSummary/orderSummaryRow/OrderSummaryRow.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { ORDER_MESSAGE } from "@/constants";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import { useToggleOption } from "@/hooks/useToggleOption";

interface BundleDeliverySelectorProps {
  deliveryId: number | null;
  deliveryDto: DeliveryDto;
}

export default function BundleDeliverySelector({
  deliveryId,
  deliveryDto,
}: BundleDeliverySelectorProps) {
  const {
    isBundleDelivery,
    backupDeliveryDto,
    setIsBundleDelivery,
    setDeliveryDto,
    setDeliveryId,
  } = useDeliveryStore();

  const handleBundleClick = () => {
    setIsBundleDelivery(true);
    setDeliveryDto(initialDeliveryDto);
    setDeliveryId(deliveryId);
  };
  const handleSingleClick = () => {
    setIsBundleDelivery(false);
    setDeliveryDto(backupDeliveryDto);
    setDeliveryId(null);
  };


  const { onToggle, isSelected } = useToggleOption<boolean>(
    isBundleDelivery,
    "checkbox",
    (newVal) => {
      if (newVal) {
        handleBundleClick();
      } else {
        handleSingleClick();
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
