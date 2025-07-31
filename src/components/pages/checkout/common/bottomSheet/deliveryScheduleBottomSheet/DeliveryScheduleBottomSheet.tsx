import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import * as styles from "./DeliveryScheduleBottomSheet.css";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Image from "next/image";
import ScheduleImage from "public/images/subscription/delivery-schedule.png";
import InfoBox from "@/components/common/infoBox/InfoBox";
import { formatDateToKorean } from "@/utils";

interface DeliveryScheduleBottomSheetProps {
  isOpen: boolean;
  deliveryDate: string;
  nextDeliveryDate: string;
  onClose: () => void;
}

export default function DeliveryScheduleBottomSheet({
  isOpen,
  deliveryDate,
  nextDeliveryDate,
  onClose,
}: DeliveryScheduleBottomSheetProps) {
  // 필요 유무 판단후 삭제 예정 25.07.30
  console.log("nextDeliveryDate", nextDeliveryDate);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className={styles.deliveryScheduleBottomSheetContainer}>
        <DefaultText type="title4">배송 일정 안내</DefaultText>
        <div className={styles.deliveryScheduleTextWrapper}>
          <DefaultText type="body3" color="gray800">
            바프독은{" "}
            <DefaultText type="label3" color="gray800">
              선 주문 후 생산 시스템
            </DefaultText>
            입니다.
          </DefaultText>
          <DefaultText type="body3" color="gray800">
            여유있게 주문해 주시면 감사드리겠습니다 :)
          </DefaultText>
        </div>
      </div>
      <div className={styles.deliveryScheduleImageWrapper}>
        <Image
          src={ScheduleImage}
          alt="배송 일정"
          fill
          style={{ objectFit: "contain" }} // 또는 'cover'
        />
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
