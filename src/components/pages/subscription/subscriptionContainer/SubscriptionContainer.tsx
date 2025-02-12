"use client";

import { useSearchParams } from "next/navigation";
import SelectRecipe from "./selectRecipe/SelectRecipe";
import SelectOption from "./selectOption/SelectOption";
import { useGetSurveyRecipe } from "@/api/survey/queries/useGetSurveyRecipe";
import { useGetSurveyResult } from "@/api/survey/queries/useGetSurveyResult";
import { useGetPlanDiscount } from "@/api/subscription/queries/useGetPlanDiscount";
import useSubscription from "@/hooks/useSubscription";

interface SubscriptionContainerProps {
  reportId: number;
}

export default function SubscriptionContainer({
  reportId,
}: SubscriptionContainerProps) {
  const searchParams = useSearchParams();

  const { data: recipeData } = useGetSurveyRecipe(reportId);
  const { data: resultData } = useGetSurveyResult(reportId);
  const { data: discountData } = useGetPlanDiscount();

  // 레시피, 플랜 상태 관리 커스텀 훅
  const {
    selectedPlan,
    selectedRecipes,
    selectedVolume,
    handleSelectedPlan,
    handleSelectedRecipe,
    handleSelectedVolume,
  } = useSubscription();

  // 기본값을 빈 문자열로 지정하여 null을 방지
  const type = searchParams.get("type") ?? "";

  switch (type) {
    case "select-recipe":
      return (
        <SelectRecipe
          onRecipeSelect={handleSelectedRecipe}
          selectedRecipes={selectedRecipes}
          recipeData={recipeData}
          inedibleFood={resultData.inedibleFood}
          reportId={reportId}
        />
      );
    case "select-option":
      return <SelectOption recipeData={recipeData} resultData={resultData} selectedRecipes={selectedRecipes} selectedPlan={selectedPlan} selectedVolume={selectedVolume}/>;
    default:
      return (
        <div>
          <p>잘못된 요청입니다.</p>
        </div>
      );
  }
}
