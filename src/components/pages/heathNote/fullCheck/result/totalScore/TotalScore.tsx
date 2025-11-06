import { commonWrapper } from "@/styles/common.css";
import CrownIcon from "/public/images/healthNote/full-check/crown.svg";
import CohortIcon from "/public/images/healthNote/full-check/cohort.svg";
import Text from "@/components/ui/text/Text";
import CircleProgressBar from "@/components/pages/heathNote/common/progressBar/circleProgressBar/CircleProgressBar";
import Card from "@/components/ui/card/Card";
import ResultCard from "@/components/pages/heathNote/common/resultCard/ResultCard";
import InfoBox from "@/components/pages/heathNote/common/infoBox/InfoBox";
import { RESULT_HEALTH_STATUS_ICON_MAP } from "@/constants";
import { getSimpleHealthStatus } from "@/utils/healthNote/common/getHealthStatus";

interface TotalScoreProps {
  petName: string;
  checkupScore: number;
  totalCheckupScorePercentile: number;
  cohortCheckupScorePercentile: number;
}

export default function TotalScore({
  petName,
  checkupScore,
  totalCheckupScorePercentile,
  cohortCheckupScorePercentile,
}: TotalScoreProps) {
  const healthStatusKey = getSimpleHealthStatus(checkupScore).key;
  const rankInfo = [
    {
      label: "전체 반려견 중",
      icon: CrownIcon,
      value: totalCheckupScorePercentile,
    },
    {
      label: "또래 중",
      icon: CohortIcon,
      value: cohortCheckupScorePercentile,
    },
  ];

  return (
    <ResultCard
      className={commonWrapper({ direction: 'col', gap: 20 })}
      title={`${petName}의\n건강 종합 점수`}
    >
      <CircleProgressBar
        score={checkupScore}
        svgImage={RESULT_HEALTH_STATUS_ICON_MAP[healthStatusKey]}
      />
      <Card
        shadow="none"
        direction='row'
      >
        {rankInfo.map((info) => (
          <InfoBox
            key={info.label}
            label={info.label}
            icon={info.icon}
            content={
              <>
                <Text type="label3">상위</Text>
                <Text type="title3">{info.value}</Text>
                <Text type="label3">%</Text>
              </>
            }
          />
        ))}
      </Card>
      <Text type="caption2" color="gray600" align="center">
        ※ 해당 결과지는 바프독 고객을 대상으로한 참고용 결과이니,자세한 반려견
        건강 상태는 담당 수의사와 상담해 주세요.
      </Text>
    </ResultCard>
  );
};
