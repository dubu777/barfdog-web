import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import * as styles from "./TermsBottomSheet.css";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";

interface TermsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsBottomSheet({
  isOpen,
  onClose,
}: TermsBottomSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className={styles.termsBottomSheetContainer}>
        <DefaultText type="title4">이용약관동의</DefaultText>
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
