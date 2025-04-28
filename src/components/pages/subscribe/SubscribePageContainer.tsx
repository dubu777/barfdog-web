"use client";

import { useSearchParams } from "next/navigation";
import { useGetSurveyRecipe } from "@/api/survey/queries/useGetSurveyRecipe";
import { useGetSurveyResult } from "@/api/survey/queries/useGetSurveyResult";
import { FormProvider } from "react-hook-form";
import { useSubscriptionForm } from "@/hooks/survey/useSubscriptionForm";
import {
  defaultSubscriptionValues,
  subscriptionSchema,
} from "@/utils/validation/subscriptionValidation";
import RecipeOptions from "./recipeOptions/RecipeOptions";
import DeliveryOptions from "./deliveryOptions/DeliveryOptions";

interface SubscribePageContainerProps {
  reportId: number;
}

export default function SubscribePageContainer({
  reportId,
}: SubscribePageContainerProps) {
  const searchParams = useSearchParams();

  const { data: recipeData } = useGetSurveyRecipe(reportId);
  const { data: resultData } = useGetSurveyResult(reportId);
  // 레시피, 플랜 상태 관리 커스텀 훅

  const type = searchParams.get("type") ?? "";

  const formMethods = useSubscriptionForm<typeof subscriptionSchema>(
    subscriptionSchema,
    defaultSubscriptionValues
  );

  console.log('주문서 form', formMethods.watch());
  
  return (
    <FormProvider {...formMethods}>
      {type === "select-recipe" && recipeData && resultData && (
        <RecipeOptions
          recipeData={recipeData}
          inedibleFood={resultData.inedibleFood}
          reportId={reportId}
        />
      )}

      {type === "select-option" && recipeData && resultData && (
        <DeliveryOptions

        />
      )}

      {/* 최종 다음/제출 버튼 (SelectDeliveryOption 내부에 있던 ButtonDocked 대체) */}
      {type === "select-option" && (
        <button type="submit" style={{ display: "none" }} />
      )}
    </FormProvider>
  );
}
