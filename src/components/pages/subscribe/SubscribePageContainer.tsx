"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useGetSurveyRecipe } from "@/api/survey/queries/useGetSurveyRecipe";
import { useGetSurveyResult } from "@/api/survey/queries/useGetSurveyResult";
import { FormProvider, useWatch } from "react-hook-form";
import { useSubscriptionForm } from "@/hooks/survey/useSubscriptionForm";
import {
  defaultSubscriptionValues,
  subscriptionSchema,
  SubscriptionValues,
} from "@/utils/validation/subscriptionValidation";
import RecipeOptions from "./recipeOptions/RecipeOptions";
import DeliveryOptions from "./deliveryOptions/DeliveryOptions";
import SubscribeProgressBar from "./subscribeProgressBar/SubscribeProgressBar";
import { subscribeStepMap } from "@/constants";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import GeneralItemOptions from "./generalItemOptions/GeneralItemOptions";

interface SubscribePageContainerProps {
  reportId: number;
}

export default function SubscribePageContainer({
  reportId,
}: SubscribePageContainerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: recipeData } = useGetSurveyRecipe(reportId);
  const { data: resultData } = useGetSurveyResult(reportId);

  console.log("레시피 데이터", recipeData);
  console.log("설문 결과 데이터", resultData);

  const type = searchParams.get("type") ?? "";

  const formMethods = useSubscriptionForm<typeof subscriptionSchema>(
    subscriptionSchema,
    defaultSubscriptionValues
  );

  const recipeList = useWatch<SubscriptionValues, "recipeList">({
    control: formMethods.control,
    name: "recipeList",
  });

  const selectedIds = recipeList.map((f) => f.recipeId);

  const currentStep = subscribeStepMap[type] ?? 1;

  console.log("주문서 form", formMethods.watch());

  const handleSubmit = () => {
    router.push(
      `/diet-analysis/subscribe?reportId=${reportId}&type=general-item`
    );
  };

  const inedibleFood = ["닭", "칠면조"];
  return (
    <FormProvider {...formMethods}>
      <SubscribeProgressBar currentStep={currentStep} />
      {type === "recipe" && recipeData && resultData && (
        <RecipeOptions
          recipeData={recipeData}
          inedibleFood={inedibleFood}
          selectedIds={selectedIds}
        />
      )}

      {type === "general-item" && recipeData && resultData && (
        <GeneralItemOptions />
      )}
      {type === "delivery-cycle" && recipeData && resultData && (
        <DeliveryOptions />
      )}
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="주문하기"
        onPrimaryClick={handleSubmit}
        primaryButtonSize="lg"
        primaryCount={2}
      />
    </FormProvider>
  );
}
