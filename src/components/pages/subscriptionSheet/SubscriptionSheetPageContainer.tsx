"use client";

import { useSearchParams } from "next/navigation";
import SelectRecipe from "./selectRecipe/SelectRecipe";
import { useGetSurveyRecipe } from "@/api/survey/queries/useGetSurveyRecipe";
import { useGetSurveyResult } from "@/api/survey/queries/useGetSurveyResult";
import { useGetPlanDiscount } from "@/api/subscription/queries/useGetPlanDiscount";
import useSubscription from "@/hooks/useSubscription";
import SelectDeliveryOption from "./selectDeliveryOption/SelectDeliveryOption";
import { FormProvider } from "react-hook-form";
import { useSubscriptionForm } from "@/hooks/survey/useSubscriptionForm";
import {
  defaultSubscriptionValues,
  subscriptionSchema,
} from "@/utils/validation/subscriptionValidation";

interface SubscriptionSheetPageContainerProps {
  reportId: number;
}

export default function SubscriptionSheetPageContainer({
  reportId,
}: SubscriptionSheetPageContainerProps) {
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

  const type = searchParams.get("type") ?? "";

  const formMethods = useSubscriptionForm<typeof subscriptionSchema>(
    subscriptionSchema,
    defaultSubscriptionValues
  );

  console.log('주문서 form', formMethods.watch());
  
  return (
    <FormProvider {...formMethods}>
      {type === "select-recipe" && recipeData && resultData && (
        <SelectRecipe
          onRecipeSelect={handleSelectedRecipe}
          selectedRecipes={selectedRecipes}
          recipeData={recipeData}
          inedibleFood={resultData.inedibleFood}
          reportId={reportId}
        />
      )}

      {type === "select-option" && recipeData && resultData && (
        <SelectDeliveryOption
          recipeData={recipeData}
          resultData={resultData}
          selectedRecipes={selectedRecipes}
          selectedPlan={selectedPlan}
          selectedVolume={selectedVolume}
        />
      )}

      {/* 최종 다음/제출 버튼 (SelectDeliveryOption 내부에 있던 ButtonDocked 대체) */}
      {type === "select-option" && (
        <button type="submit" style={{ display: "none" }} />
      )}
    </FormProvider>
  );
}
