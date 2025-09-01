import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import * as styles from "./TermsBottomSheet.css";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Text from "@/components/common/text/Text";

interface TermsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function TermsBottomSheet({
  isOpen,
  onClose,
  onSubmit,
}: TermsBottomSheetProps) {
  const handleSubmit = () => {
    onSubmit();
    onClose();
  };
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className={styles.termsBottomSheetContainer}>
        <Text type="title4">이용약관동의</Text>
      </div>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="확인"
        onPrimaryClick={handleSubmit}
        primaryButtonSize="lg"
      />
    </BottomSheet>
  );
}
