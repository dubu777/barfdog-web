import BottomSheet from "@/components/ui/bottomSheet/BottomSheet";
import * as styles from "./DeliveryScheduleBottomSheet.css";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import Text from "@/components/ui/text/Text";
import ScheduleImage from "public/images/subscription/delivery-schedule.svg";
import InfoBox from "@/components/ui/infoBox/InfoBox";
import { formatDateToKorean } from "@/utils";

interface DeliveryScheduleBottomSheetProps {
  isOpen: boolean;
  deliveryDate: string;
  onClose: () => void;
}

export default function DeliveryScheduleBottomSheet({
  isOpen,
  deliveryDate,
  onClose,
}: DeliveryScheduleBottomSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className={styles.deliveryScheduleBottomSheetContainer}>
        <Text type="title4">배송 일정 안내</Text>
        <div className={styles.deliveryScheduleTextWrapper}>
          <Text type="body3" color="gray800">
            바프독은{" "}
            <Text type="label3" color="gray800">
              선 주문 후 생산 시스템
            </Text>
            입니다.
          </Text>
          <Text type="body3" color="gray800">
            여유있게 주문해 주시면 감사드리겠습니다 :)
          </Text>
        </div>
      </div>
      <div className={styles.deliveryScheduleImageWrapper}>
        <ScheduleImage className={styles.scheduleSvg} />
      </div>
      <div className={styles.deliveryScheduleInfoBoxWrapper}>
        <InfoBox
          color="blue"
          text={`지금 주문 시 ${formatDateToKorean(deliveryDate)} 출고`}
          fullWidth
        />
      </div>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="확인"
        onPrimaryClick={onClose}
        primaryButtonSize="lg"
      />
    </BottomSheet>
  );
}
