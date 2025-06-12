"use client";

import { useGetDietAnalysisResult } from "@/api/dietAnalysis/queries/useGetDietAnalysisResult";
import ResultSummary from "./resultSummary/ResultSummary";
import DietReason from "./dietReason/DietReason";
import Divider from "@/components/common/divider/Divider";
import { commonWrapper } from "@/styles/common.css";
import RecommendedRecipeList from "./RecommendedrecipeList/RecommendedRecipeList";

interface DietAnalysisResultProps {
  reportId: number;
}
export default function DietAnalysisResult({
  reportId,
}: DietAnalysisResultProps) {
  const { data: surveyResult } = useGetDietAnalysisResult(reportId);
  console.log("surveyResult", surveyResult);

  return (
    <div
      className={commonWrapper({
        direction: "col",
        gap: 40,
        backgroundColors: "gray50",
      })}
    >
      <ResultSummary
        dogName={surveyResult.secondResultResponse.dogName}
        firstResponse={surveyResult.firstResultResponse}
      />
      <Divider thickness={8} color="gray100" />
      <DietReason secondResponse={surveyResult.secondResultResponse} />
      <Divider thickness={8} color="gray100" />
      <RecommendedRecipeList
        dogName={surveyResult.secondResultResponse.dogName}
        recommendRecipeList={
          surveyResult.thirdResultResponse.recommendRecipeRankDtoList
        }
      />
    </div>
  );
}
