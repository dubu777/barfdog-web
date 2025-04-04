import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import * as styles from "./NextPaymentBottomSheet.css";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface NextPaymentBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NextPaymentBottomSheet({
  isOpen,
  onClose,
}: NextPaymentBottomSheetProps) {


  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={styles.nextPaymentBottomSheetContainer}>
      <DefaultText type="title4">다음 회차 예상 결제 금액</DefaultText>
      <DefaultText type="body2">다음 회차 예상 금액은 총 금액에서 할인 혜택을 적용한 금액으로, 등급 할인과 쿠폰 사용, 적립금 사용 여부에 따라 달라질 수 있습니다.</DefaultText>
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
