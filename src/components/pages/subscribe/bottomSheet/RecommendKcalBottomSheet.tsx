import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";
import * as styles from "./RecommendKcalBottomSheet.css";
import ArrowIcon from "public/images/icons/right-arrow.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";

interface RecommendKcalBottomSheetProps {
  dogName: string;
  oneDayRecommendKcal: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function RecommendKcalBottomSheet({
  oneDayRecommendKcal,
  dogName,
  isOpen,
  onClose,
}: RecommendKcalBottomSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className={styles.recommendKcalContainer}>
      <div className={commonWrapper({direction: "col", align: "start", justify: "start", gap: 12, padding: 20, backgroundColors: "gray0"})}>
        <DefaultText type="title4">한 끼 추천 급여량은 하루 권장<br/>칼로리를 기준으로 계산해 드려요</DefaultText>
        <DefaultText type="body3" color="gray800">・ {dogName}의 하루 권장 칼로리 {oneDayRecommendKcal}kcal를 기준으로, 각 레시피의 원재료 열량(g당 칼로리)을 반영해서 한 끼 추천 급여량을 계산했어요.</DefaultText>
        <DefaultText type="body3" color="gray800">・ 레시피마다 추천 급여량과 가격이 다를 수 있으며, 레시피를 담을 때 급여량 조절이 가능해요.</DefaultText>
      </div>
      <div className={commonWrapper({ gap: 6, padding: 20, backgroundColors: "gray50"})}>
        <div className={styles.recommendKcalBox}>
          <DefaultText type="label2" color="gray700">하루 권장 칼로리</DefaultText>
          <DefaultText type="title4" color="red">{oneDayRecommendKcal}kcal</DefaultText>
        </div>
        <SvgIcon src={ArrowIcon} color="gray900" />
        <div className={styles.recommendKcalBox}>
          <DefaultText type="label2" color="gray700">한끼 권장 칼로리</DefaultText>
          <DefaultText type="title4" color="red">{oneDayRecommendKcal/2}kcal</DefaultText>
        </div>
      </div>
      </div>
      <ButtonDocked type="full-button" primaryButtonLabel="확인" onPrimaryClick={onClose} />
    </BottomSheet>
  );
}
