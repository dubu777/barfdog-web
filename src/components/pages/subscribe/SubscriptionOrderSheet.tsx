"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import {
  defaultSubscriptionValues,
  subscriptionSchema,
  SubscriptionValues,
} from "@/utils/validation/subscriptionValidation";
import DeliveryOptions from "./deliveryOptions/DeliveryOptions";
import SubscribeProgressBar from "./subscribeProgressBar/SubscribeProgressBar";
import { subscribeStepMap } from "@/constants";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { useCallback, useState } from "react";
import { SubscriptionStep } from "@/types";
import Header from "@/components/layout/header/Header";
import Chips from "@/components/common/chips/Chips";
import * as styles from "./SubscriptionOrderSheet.css";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useGetRawFoodOrderSheet } from "@/api/subscription/queries/useGetRawFoodOrderSheet";
import RawFoodOptions from "./rawFoodOptions/RawFoodOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateSubscription } from "@/api/subscription/mutations/useCreateSubscription";
import { useSubscriptionCalculation } from "@/hooks/subscription/useSubscriptionCalculation";

interface SubscriptionOrderSheetProps {
  reportId: number;
}

export default function SubscriptionOrderSheet({
  reportId,
}: SubscriptionOrderSheetProps) {
  const router = useRouter();
  const [step, setStep] = useState<SubscriptionStep>("rawFood");
  const { data: rawFoodSheetData } = useGetRawFoodOrderSheet(reportId);
  const { mutate: createSubscription } = useCreateSubscription();
  console.log(rawFoodSheetData);

  useScrollToTop(step);

  const form = useForm<SubscriptionValues>({
    resolver: yupResolver(subscriptionSchema),
    defaultValues: defaultSubscriptionValues,
    mode: "all",
  });

  const savedSelection =
    useWatch({
      control: form.control,
      name: "rawFoods",
    }) ?? [];
  const mealPlan =
    useWatch({
      control: form.control,
      name: "mealPlan",
    }) || "TWO_MEAL";
  const deliveryPlan =
    useWatch({
      control: form.control,
      name: "deliveryPlan",
    }) || "TWO_WEEK";

  const currentStep = subscribeStepMap[step] ?? 1;

  const { recipes, totals, recipeCount } = useSubscriptionCalculation({
    savedSelection,
    mealPlan,
    deliveryPlan,
  });

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

  const handleSubmit = () => {
    const rawFoodsPayload = recipes.map(
      ({ recipeId, packGrams, originalPrice, discountedPrice }) => ({
        recipeId,
        oneMealGramsPerRecipe: packGrams,
        originalPrice,
        discountedPrice,
      })
    );

    const body = {
      deliveryPlan,
      mealPlan,
      discountPrice: totals.totalDiscountAmount,
      paymentExpectedPrice: totals.paymentExpectedPrice,
      rawFoods: rawFoodsPayload,
      totalOriginalPrice: totals.totalOriginalPrice,
    } as const;
    createSubscription(
      { reportId, body },
      {
        onSuccess: (data) => {
          router.push(`/checkout/subscription/${data.subscriptionId}`);
        },
      }
    );
  };

  const primaryLabel = step === "deliveryCycle" ? "결제하러 가기" : "주문하기";
  const handleAction = step === "deliveryCycle" ? handleSubmit : handleNext;

  return (
    <FormProvider {...form}>
      <Header onBack={handleBack} showBackButton />
      <div
        className={styles.subscribePageContainer({
          withPadding: recipeCount > 0,
        })}
      >
        <SubscribeProgressBar currentStep={currentStep} />
        {step === "rawFood" && (
          <RawFoodOptions rawFoodSheetData={rawFoodSheetData} />
        )}
        {step === "deliveryCycle" && (
          <DeliveryOptions
            rawFoodSheetData={rawFoodSheetData}
            calculatedRecipes={recipes}
            mealPlan={mealPlan}
            deliveryPlan={deliveryPlan}
            totalOriginalPrice={totals.totalOriginalPrice}
            paymentExpectedPrice={totals.paymentExpectedPrice}
            totalDiscountAmount={totals.totalDiscountAmount}
          />
        )}
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
            onPrimaryClick={handleAction}
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
