import Text from "@/components/common/text/Text";
import OrderSection from "../../common/orderSection/OrderSection";
import * as styles from "./DeliverySchedule.css";
import DeliveryScheduleBottomSheet from "../../common/bottomSheet/deliveryScheduleBottomSheet/DeliveryScheduleBottomSheet";
import useModal from "@/hooks/useModal";
import { format } from "date-fns";

interface DeliveryScheduleProps {
  deliveryDate: string;
  nextDeliveryDate: string;
}

export default function DeliverySchedule({
  deliveryDate,
  nextDeliveryDate,
}: DeliveryScheduleProps) {
  const { isOpen, onClose, onToggle } = useModal();
  return (
    <OrderSection
      title="배송 일정"
      subTitleParts={[{ text: "배송 일정", color: "gray600" }]}
      showArrowIcon
      onSubtitleClick={() => onToggle()}
    >
      <div className={styles.deliveryScheduleWrapper}>
        <div className={styles.deliveryScheduleContentWrapper}>
          <Text type="body2" color="gray700">
            배송 예정일
          </Text>
          <Text type="label2" color="gray900">
            {format(deliveryDate, "yy.MM.dd")}
          </Text>
        </div>
        <div className={styles.deliveryScheduleContentWrapper}>
          <Text type="body2" color="gray700">
            다음 배송 예정일
          </Text>
          <Text type="label2" color="gray900">
            {format(nextDeliveryDate, "yy.MM.dd")}
          </Text>
        </div>
      </div>
      <DeliveryScheduleBottomSheet
        isOpen={isOpen}
        onClose={onClose}
        deliveryDate={deliveryDate}
      />
    </OrderSection>
  );
}
