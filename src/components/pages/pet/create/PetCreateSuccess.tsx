import * as styles from "../PetModal.css";
import CheckIcon from "public/images/icons/check_circle.svg";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Text from "@/components/ui/text/Text";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";

interface PetCreateSuccessProps {
  handleGoToSurvey: () => void;
  handleClose: () => void;
}

export default function PetCreateSuccess({
  handleGoToSurvey,
  handleClose,
}: PetCreateSuccessProps) {
  return (
    <div className={styles.completeCreateWrapper}>
      <SvgIcon src={CheckIcon} color="red" size={48} />
      <Text className={styles.completeCreateTitle} type="title1">
        등록이 완료되었어요!
      </Text>
      <Text type="body2" color="gray600" align="center">
        이제 우리 아이에게 딱 맞는 식단을 추천해 드릴게요
        <br />
        간단한 설문으로 추천 식단을 받아볼 수 있어요
      </Text>
      <ButtonDocked
        type="dual-button"
        primaryButtonLabel="식단 추천받기"
        secondaryButtonLabel="나중에"
        onPrimaryClick={handleGoToSurvey}
        onSecondaryClick={handleClose}
        position="fixed"
        primaryButtonSize="lg"
      />
    </div>
  );
}
