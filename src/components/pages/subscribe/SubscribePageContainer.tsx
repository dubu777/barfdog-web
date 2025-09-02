"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useGetSurveyResult } from "@/api/survey/queries/useGetSurveyResult";
import { FormProvider, useWatch } from "react-hook-form";
import { useSubscriptionForm } from "@/hooks/survey/useSubscriptionForm";
import {
  defaultSubscriptionValues,
  subscriptionSchema,
  SubscriptionValues,
} from "@/utils/validation/subscriptionValidation";
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
import { useGetRawFoodOrderSheet } from "@/api/subscription/queries/useGetRawFoodOrderSheet";
import RawFoodOptions from "./rawFoodOptions/RawFoodOptions";

interface SubscribePageContainerProps {
  reportId: number;
}

export default function SubscribePageContainer({
  reportId,
}: SubscribePageContainerProps) {
  const router = useRouter();
  const [step, setStep] = useState<SubscriptionStep>("rawFood");
  const { data: rawFoodData } = useGetRawFoodOrderSheet(reportId);

  useScrollToTop(step);

  const formMethods = useSubscriptionForm<typeof subscriptionSchema>(
    subscriptionSchema,
    defaultSubscriptionValues
  );

  const rawFoodList =
    useWatch<SubscriptionValues, "rawFoods">({
      control: formMethods.control,
      name: "rawFoods",
    }) ?? [];

  const recipeCount = rawFoodList.length;
  const selectedRawFoodIds = rawFoodList.map((f) => f.recipeId);
  const currentStep = subscribeStepMap[step] ?? 1;

  console.log("주문서 form", formMethods.watch());

  const handleNext = () => {
    if (step === "rawFood") {
      if (recipeCount < 1) return;
      setStep("deliveryCycle");
    }
  };

  const handleBack = useCallback(() => {
    if (step === "rawFood") {
      router.back();
    } else if (step === "deliveryCycle") {
      setStep("rawFood");
    }
  }, [step, router]);

  const handleSubmit = () => {};

  const primaryLabel = step === "deliveryCycle" ? "결제하러 가기" : "주문하기";
  const primaryAction = step === "deliveryCycle" ? handleSubmit : handleNext;

  const inedibleFood = ["닭", "칠면조"];
  return (
    <FormProvider {...formMethods}>
      <Header onBack={handleBack} showBackButton />
      <div
        className={styles.subscribePageContainer({
          withPadding: recipeCount > 0,
        })}
      >
        <SubscribeProgressBar currentStep={currentStep} />
        {step === "rawFood" && (
          <RawFoodOptions
            rawFoodData={rawFoodData}
            inedibleFood={inedibleFood}
            selectedIds={selectedRawFoodIds}
          />
        )}

        {/* {step === "delivery-cycle" && (
          <DeliveryOptions rawFoodData={rawFoodData} />
        )} */}
        {recipeCount === 2 && step === "rawFood" && (
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
            {...(step !== "deliveryCycle" && recipeCount > 0
              ? { primaryCount: recipeCount }
              : {})}
          />
        )}
      </div>
    </FormProvider>
  );
}
