import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Text from "@/components/common/text/Text";
import * as styles from "./SurveyBottomSheet.css";

interface InedibleBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InedibleBottomSheet({
  isOpen,
  onClose,
}: InedibleBottomSheetProps) {


  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={styles.surveyBottomSheetContainer}>
      <Text type="headline1">바프독의 모든 레시피에는 영양분이 가득한 육고기, 뼈, 내장, 채소 등이 들어가요</Text>
      <Text type="body2" color="gray600">육고기와 뼈의 경우 알러지 분류에 들어가지만 내장의 경우 알러지 분류에 들어가지 않으니 참고해 주세요</Text>
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
