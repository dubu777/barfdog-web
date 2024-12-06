import * as styles from "./DeliveryScheduleModal.css";
import { subscribeText } from "../../recipeSelection/RecipeSelection.css";
import RightArrowIcon from "public/images/icons/right-arrow-red.svg";
import ScheduleImage from "public/images/icons/schedule.png";
import Image from "next/image";
import DefaultModal from "@/components/common/defaultModal/DefaultModal";
import { calculateDeliveryDates } from "@/utils/subscription/calculateDeliveryDates";
import { formatDateToKorean } from "@/utils/formatDateToKorean";

interface DeliveryScheduleModalProps {
  isVisible: boolean;
  onClose: () => void;
  onClickConfirm: () => void;
}

export default function DeliveryScheduleModal({
  isVisible,
  onClose,
  onClickConfirm,
}: DeliveryScheduleModalProps) {
  const { shipmentDate } = calculateDeliveryDates();

  return (
    <DefaultModal
      isVisible={isVisible}
      onClose={onClose}
      type="alert"
      size="md"
      cancelText="취소"
      confirmText="확인"
      onClickConfirm={onClickConfirm}
    >
      <div className={styles.deliveryModalContainer}>
        <h2 className={subscribeText({ type: "body", isBold: true })}>
          배송 일정 안내
        </h2>
        <div className={styles.deliveryModalContentWrapper}>
          <p className={subscribeText({ type: "content" })}>
            바프독은{" "}
            <span className={subscribeText({ type: "content", isBold: true })}>
              선 주문 후 생산
            </span>{" "}
            시스템!
          </p>
          <p
            className={subscribeText({
              type: "content",
              color: "red",
              isBold: true,
            })}
          >
            매주 목요일 주문 마감 <RightArrowIcon /> 생산 <RightArrowIcon />{" "}
            화요일 일괄 출고
          </p>
          <p className={subscribeText({ type: "description" })}>
            여유있게 주문해주시면 감사하겠습니다 :)
          </p>
        </div>
        <Image
          src={ScheduleImage}
          alt="schedule image"
          width={229}
          height={76}
        />
        <div className={styles.deliveryDateInfoBox}>
          <p className={subscribeText({ type: "content" })}>
            지금 주문 시{" "}
            <span
              className={subscribeText({
                type: "content",
                isBold: true,
                color: "red",
              })}
            >
              {formatDateToKorean(shipmentDate)}
            </span>
            출고!
          </p>
        </div>
      </div>
    </DefaultModal>
  );
}
