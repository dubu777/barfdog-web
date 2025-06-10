"use client";
import ResultCard from "../../../common/resultCard/ResultCard";
import CircleProgressBar from "../../../common/progressBar/circleProgressBar/CircleProgressBar";
import { BodyCheckPart, DiseaseName } from "@/types/healthNote";
import { bodyCheckSurveyConfig } from "@/config/bodyCheckSurveyConfig";
import { commonWrapper } from "@/styles/common.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import BodyCheckScoreCard from "./bodyCheckScoreCard/BodyCheckScoreCard";

interface BodyCheckTotalScoreProps {
  dogName: string;
  score: Array<{ name: string; score: number }>;
  totalScore: number;
  part: BodyCheckPart;
}

export default function BodyCheckTotalScore({
  dogName,
  totalScore,
  score,
  part,
}: BodyCheckTotalScoreProps) {
  const config = bodyCheckSurveyConfig[part];

  return (
    <ResultCard
      className={commonWrapper({
        direction: "col",
        gap: 20,
      })}
      title={`${dogName}의\n${config.name} 정밀 진단 결과`}
      subTitle={`장내 미생물 데이터 기반 설계를 바탕으로
우리 아이의 ${config.name} 건강을 살펴볼 수 있어요`}
    >
      <CircleProgressBar score={totalScore} svgImage={config.Icon} />
      <div className={commonWrapper({ direction: "col", gap: 8 })}>
        {score.map((item) => (
          <BodyCheckScoreCard
            diseaseName={item.name as DiseaseName}
            score={item.score}
            key={item.name}
          />
        ))}
      </div>
      <DefaultText type="caption2" color="gray600" align="center">
        ※ 해당 결과지는 바프독 고객을 대상으로한 참고용 결과이니,자세한 반려견
        건강 상태는 담당 수의사와 상담해 주세요.
      </DefaultText>
    </ResultCard>
  );
}
