import * as styles from "./TotalScore.css";
import CrownIcon from "/public/images/healthNote/full-check/crown.svg";
import DefaultText from "@/components/common/defaultText/DefaultText";
import CircleProgressBar from "@/components/pages/heathNote/common/progressBar/circleProgressBar/CircleProgressBar";
import Card from "@/components/common/card/Card";
import ResultCard from "@/components/pages/heathNote/common/resultCard/ResultCard";
import InfoBox from "@/components/pages/heathNote/common/infoBox/InfoBox";
import { DOG_SIZE } from "@/constants/dog";
import {
  RESULT_DOG_SIZE_ICON_MAP,
  RESULT_HEALTH_STATUS_ICON_MAP,
} from "@/constants";
import { getSimpleHealthStatus } from "@/utils/healthNote/getHealthStatus";
import { DogSize } from "@/types";

interface TotalScoreProps {
  dogName: string;
  totalScore: number;
  rankOverall: number;
  rankDogSize: number;
  dogSize: DogSize;
}

const TotalScore = ({
  dogName,
  totalScore,
  rankOverall,
  rankDogSize,
  dogSize,
}: TotalScoreProps) => {
  const healthStatusKey = getSimpleHealthStatus(totalScore).key;
  const rankInfo = [
    {
      label: "전체 반려견",
      icon: CrownIcon,
      value: rankOverall,
    },
    {
      label: DOG_SIZE[dogSize],
      icon: RESULT_DOG_SIZE_ICON_MAP[dogSize],
      value: rankDogSize,
    },
  ];

  return (
    <ResultCard
      className={styles.totalScoreContainer}
      title={`${dogName}의\n건강 종합 점수`}
    >
      <CircleProgressBar
        score={totalScore}
        svgImage={RESULT_HEALTH_STATUS_ICON_MAP[healthStatusKey]}
      />
      <Card shadow="none" className={styles.rankBox}>
        {rankInfo.map((info) => (
          <InfoBox
            key={info.label}
            label={info.label}
            icon={info.icon}
            content={
              <>
                <DefaultText type="label3">상위</DefaultText>
                <DefaultText type="title3">{info.value}</DefaultText>
                <DefaultText type="label3">%</DefaultText>
              </>
            }
          />
        ))}
      </Card>
      <DefaultText type="caption2" color="gray600" align="center">
        ※ 해당 결과지는 바프독 고객을 대상으로한 참고용 결과이니,자세한 반려견
        건강 상태는 담당 수의사와 상담해 주세요.
      </DefaultText>
    </ResultCard>
  );
};

export default TotalScore;
