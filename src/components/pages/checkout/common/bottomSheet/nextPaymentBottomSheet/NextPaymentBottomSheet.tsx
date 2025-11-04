import BottomSheet from "@/components/ui/bottomSheet/BottomSheet";
import * as styles from "./NextPaymentBottomSheet.css";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import Text from "@/components/ui/text/Text";

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
      <Text type="title4">다음 회차 예상 결제 금액</Text>
      <Text type="body2">다음 회차 예상 금액은 총 금액에서 할인 혜택을 적용한 금액으로, 등급 할인과 쿠폰 사용, 적립금 사용 여부에 따라 달라질 수 있습니다.</Text>
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
