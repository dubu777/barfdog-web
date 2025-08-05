"use client";

import { useGetDietAnalysisResult } from "@/api/dietAnalysis/queries/useGetDietAnalysisResult";
import ResultSummary from "./resultSummary/ResultSummary";
import DietReason from "./dietReason/DietReason";
import Divider from "@/components/common/divider/Divider";
import { commonWrapper } from "@/styles/common.css";
import RecommendedRecipeList from "./recommendedRecipeList/RecommendedRecipeList";
import DailyCalorie from "./dailyCalorie/DailyCalorie";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";

interface DietAnalysisResultProps {
  reportId: number;
}
export default function DietAnalysisResult({
  reportId,
}: DietAnalysisResultProps) {
  const { data: dietAnalysisResult } = useGetDietAnalysisResult(reportId);
  console.log("dietAnalysisResult", dietAnalysisResult);

  return (
    <div
      className={commonWrapper({
        direction: "col",
        gap: 40,
        backgroundColors: "gray50",
        paddingBottom: 128,
      })}
    >
      <ResultSummary
        dogName={dietAnalysisResult.secondResultResponse.dogName}
        firstResponse={dietAnalysisResult.firstResultResponse}
        firstHealthConcerns={
          dietAnalysisResult.secondResultResponse.firstHealthConcerns
        }
      />
      <Divider thickness={8} color="gray100" />
      <DietReason secondResponse={dietAnalysisResult.secondResultResponse} />
      <Divider thickness={8} color="gray100" />
      <RecommendedRecipeList
        dogName={dietAnalysisResult.secondResultResponse.dogName}
        recommendRecipeList={
          dietAnalysisResult.thirdResultResponse.recommendRecipeRankDtoList
        }
      />
      <Divider thickness={8} color="gray100" />
      <DailyCalorie
        dogName={dietAnalysisResult.secondResultResponse.dogName}
        dailyCalorie={
          dietAnalysisResult.thirdResultResponse.oneDayRecommendKcal
        }
      />
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="레시피 주문하기"
        onPrimaryClick={() => {}}
      />
    </div>
  );
}
