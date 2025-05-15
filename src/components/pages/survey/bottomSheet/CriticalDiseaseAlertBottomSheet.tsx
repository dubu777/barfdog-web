import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "./SurveyBottomSheet.css";
import Chips from "@/components/common/chips/Chips";
import { CRITICAL_DISEASES } from "@/constants";
import { rowStartWrapper } from "../../checkout/common/deliveryAddress/DeliveryAddress.css";

interface CriticalDiseaseAlertBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConsult: () => void;
  onContinue: () => void;
}

export default function CriticalDiseaseAlertBottomSheet({
  isOpen,
  onClose,
  onConsult,
  onContinue,
}: CriticalDiseaseAlertBottomSheetProps) {


  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={styles.surveyBottomSheetContainer}>
      <DefaultText type="headline1">바프독 레시피는 아래의 질병이 있을 경우 상담을 권장하고 있어요</DefaultText>
      <DefaultText type="body2" color="gray600">영양학 전문가와 질병에 대해 상담을 받아본 후 급여를 결정해보시는 걸 권장드립니다.</DefaultText>
      <div className={rowStartWrapper({gap: 8})}>
          {CRITICAL_DISEASES.map(({ value, label }) => (
            <Chips
              key={value}
              size="md"
              variant="solid"
              color="lightPink"
              borderRadius="lg"
            >
              {label}
            </Chips>
          ))}
        </div>
      </div>
      <ButtonDocked
        type="dual-button"
        primaryButtonLabel="상담받기"
        secondaryButtonLabel="계속하기"
        secondaryButtonType="assistive"
        onPrimaryClick={onConsult} // 
        onSecondaryClick={onContinue}
        primaryButtonSize="lg"
      />
    </BottomSheet>
  );
}
