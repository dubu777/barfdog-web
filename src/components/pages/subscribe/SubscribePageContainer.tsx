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
import { useCallback, useState } from "react";
import { SubscriptionStep } from "@/types";
import Header from "@/components/layout/header/Header";
import Chips from "@/components/common/chips/Chips";
import * as styles from "./SubscribePageContainer.css";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useGetRecipeList } from "@/api/recipes/queries/useGetRecipeList";

interface SubscribePageContainerProps {
  reportId: number;
}

export default function SubscribePageContainer({
  reportId,
}: SubscribePageContainerProps) {
  const [step, setStep] = useState<SubscriptionStep>("recipe");

  const router = useRouter();
  const { data: recipeData } = useGetSurveyRecipe(reportId);
  const { data: resultData } = useGetSurveyResult(reportId);
  const { data: recipeListData } = useGetRecipeList();

  console.log("레시피 데이터", recipeData);
  console.log("레시피 리스트 데이터", recipeListData);
  console.log("설문 결과 데이터", resultData);

  useScrollToTop(step);

  const formMethods = useSubscriptionForm<typeof subscriptionSchema>(
    subscriptionSchema,
    defaultSubscriptionValues
  );

  const recipeList =
    useWatch<SubscriptionValues, "recipeList">({
      control: formMethods.control,
      name: "recipeList",
    }) ?? [];
  const generalItemList =
    useWatch<SubscriptionValues, "generalItemList">({
      control: formMethods.control,
      name: "generalItemList",
    }) ?? [];

  const recipeCount = recipeList.length;
  const totalCount = recipeCount + generalItemList.length;
  const selectedRecipeIds = recipeList.map((f) => f.recipeId);
  const selectedGeneralItemIds = generalItemList.map((f) => f.itemId);
  const currentStep = subscribeStepMap[step] ?? 1;

  console.log("주문서 form", formMethods.watch());

  const handleNext = () => {
    if (step === "recipe") {
      if (recipeCount < 1) return; // 최소 1개 선택 유효성
      setStep("general-item");
    } else if (step === "general-item") {
      setStep("delivery-cycle");
    }
  };

  const handleBack = useCallback(() => {
    if (step === "recipe") {
      router.back();
    } else if (step === "general-item") {
      setStep("recipe");
    } else if (step === "delivery-cycle") {
      setStep("general-item");
    }
  }, [step, router]);

  const handleSubmit = () => {};

  const primaryLabel = step === "delivery-cycle" ? "결제하러 가기" : "주문하기";
  const primaryAction = step === "delivery-cycle" ? handleSubmit : handleNext;

  const inedibleFood = ["닭", "칠면조"];
  return (
    <FormProvider {...formMethods}>
      <Header onBack={handleBack} showBackButton />
      <div className={recipeCount > 0 ? styles.subscribePageContainer : undefined}>
        <SubscribeProgressBar currentStep={currentStep} />
        {step === "recipe" && recipeData && resultData && (
          <RecipeOptions
            recipeData={recipeData}
            inedibleFood={inedibleFood}
            selectedIds={selectedRecipeIds}
          />
        )}

        {step === "general-item" && recipeData && resultData && (
          <GeneralItemOptions selectedIds={selectedGeneralItemIds} />
        )}
        {step === "delivery-cycle" && recipeData && resultData && (
          <DeliveryOptions recipeData={recipeData} />
        )}
        {(recipeCount === 2 && step ==="recipe" ) && (
          <div className={styles.recipeTailChipWrapper}>
            <Chips
              variant="solid"
              color="gray800"
              size="md"
              borderRadius="md"
              tailPosition="bottom"
              tailVisible
            >
              2개 레시피 모두를 선택했어요! 이대로 주문할까요? 🐶
            </Chips>
          </div>
        )}
        {recipeCount > 0 && (
          <ButtonDocked
            type="full-button"
            primaryButtonLabel={primaryLabel}
            onPrimaryClick={primaryAction}
            primaryButtonSize="lg"
            {...(step !== "delivery-cycle" && totalCount > 0
              ? { primaryCount: totalCount }
              : {})}
          />
        )}
      </div>
    </FormProvider>
  );
}
