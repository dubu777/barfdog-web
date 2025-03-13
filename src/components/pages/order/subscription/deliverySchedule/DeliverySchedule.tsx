import DefaultText from "@/components/common/defaultText/DefaultText";
import OrderSection from "../../common/orderSection/OrderSection";
import * as styles from "./DeliverySchedule.css";

export default function DeliverySchedule() {
  return (
    <OrderSection
      title="배송 일정"
      subTitleParts={[{ text: "배송 일정" }]}
      showArrowIcon
    >
      <div className={styles.deliveryScheduleWrapper}>
        <div className={styles.deliveryScheduleContentWrapper}>
          <DefaultText type="body2" color="gray700">
            배송 예정일
          </DefaultText>
          <DefaultText type="label2" color="gray900">
            00.00.00
          </DefaultText>
        </div>
        <div className={styles.deliveryScheduleContentWrapper}>
          <DefaultText type="body2" color="gray700">
            다음 배송 예정일
          </DefaultText>
          <DefaultText type="label2" color="gray900">
            00.00.00
          </DefaultText>
        </div>
      </div>
    </OrderSection>
  );
}
