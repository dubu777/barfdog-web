"use client";

import { useGetDietAnalysisResult } from "@/api/dietAnalysis/queries/useGetDietAnalysisResult";
import ResultSummary from "./resultSummary/ResultSummary";
import DietReason from "./dietReason/DietReason";
import Divider from "@/components/ui/divider/Divider";
import { commonWrapper } from "@/styles/common.css";
import RecommendedRecipeList from "./recommendedRecipeList/RecommendedRecipeList";
import DailyCalorie from "./dailyCalorie/DailyCalorie";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import { useRouter } from "next/navigation";
import { HealthConcernType } from "@/types";
import { EDITABLE_SUBSCRIPTION_STATUSES } from "@/constants";

interface DietAnalysisResultProps {
  surveyId: number;
}
export default function DietAnalysisResult({
  surveyId,
}: DietAnalysisResultProps) {
  const router = useRouter();
  const { data: dietAnalysisResult } = useGetDietAnalysisResult(surveyId);
  console.log("dietAnalysisResult", dietAnalysisResult);
  const isEdit = EDITABLE_SUBSCRIPTION_STATUSES.has(
    dietAnalysisResult?.subscribeStatus
  );
  const handleNavigate = () => {
    if (isEdit) {
      router.push(
        `/subscribe/${surveyId}/edit/${dietAnalysisResult.subscribeId}`
      );
    } else {
      router.push(`/subscribe/${surveyId}/order-sheet`);
    }
  };

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
          dietAnalysisResult.secondResultResponse
            .firstHealthConcerns as HealthConcernType & "NONE"
        }
      />
      <Divider height={8} color="gray100" />
      <DietReason secondResponse={dietAnalysisResult.secondResultResponse} />
      <Divider height={8} color="gray100" />
      <RecommendedRecipeList
        dogName={dietAnalysisResult.secondResultResponse.dogName}
        recommendRecipeList={
          dietAnalysisResult.thirdResultResponse.recommendRecipeRankDtoList
        }
      />
      <Divider height={8} color="gray100" />
      <DailyCalorie
        dogName={dietAnalysisResult.secondResultResponse.dogName}
        dailyCalorie={
          dietAnalysisResult.thirdResultResponse.oneDayRecommendKcal
        }
      />
      <ButtonDocked
        type="full-button"
        primaryButtonLabel={isEdit ? "레시피 변경하기" : "레시피 주문하기"}
        onPrimaryClick={handleNavigate}
      />
    </div>
  );
}
