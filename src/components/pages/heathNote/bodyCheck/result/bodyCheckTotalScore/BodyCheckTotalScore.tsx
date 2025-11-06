"use client";
import { commonWrapper } from "@/styles/common.css";
import { bodyCheckDiseaseList } from "@/components/pages/heathNote/bodyCheck/result/BodyCheckResult.css";
import ResultCard from "../../../common/resultCard/ResultCard";
import CircleProgressBar from "../../../common/progressBar/circleProgressBar/CircleProgressBar";
import Text from "@/components/ui/text/Text";
import BodyCheckDiseaseCard from "./bodyCheckDiseaseCard/BodyCheckDiseaseCard";
import { BodyPartType, DiseaseCategoryKey } from "@/types/healthNote/bodyCheck";
import { BODY_PART } from "@/constants/healthNote/bodyCheck/common";
import { getNameWithPossessiveSuffix } from "@/utils";

interface BodyCheckTotalScoreProps {
  petName: string;
  scores: Array<{ name: string; score: number }>;
  totalScore: number;
  part: BodyPartType;
}

export default function BodyCheckTotalScore({
  petName,
  totalScore,
  scores,
  part,
}: BodyCheckTotalScoreProps) {
  return (
    <ResultCard
      className={commonWrapper({
        direction: "col",
        gap: 20,
      })}
      title={`${getNameWithPossessiveSuffix(petName)}의\n${BODY_PART[part].name} 정밀 진단 결과`}
      subTitle={`장내 미생물 데이터 기반 설계를 바탕으로\n우리 아이의 ${BODY_PART[part].name} 건강을 살펴볼 수 있어요`}
    >
      <CircleProgressBar
        score={totalScore}
        svgImage={BODY_PART[part].smIcon}
      />
      <div className={bodyCheckDiseaseList}>
        <Text type='title3' align='center'>항목별 진단 정보</Text>
        <div className={commonWrapper({ direction: "col", gap: 8 })}>
          {scores.map((item) => (
            <BodyCheckDiseaseCard
              key={item.name}
              diseaseName={item.name as DiseaseCategoryKey}
              score={item.score}
            />
          ))}
        </div>
      </div>
      <Text type="caption2" color="gray600" align="center">
        ※ 해당 결과지는 바프독 고객을 대상으로한 참고용 결과이니,<br/>
        자세한 반려견 건강 상태는 담당 수의사와 상담해 주세요.
      </Text>
    </ResultCard>
  );
}
