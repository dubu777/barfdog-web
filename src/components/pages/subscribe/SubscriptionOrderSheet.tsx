"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import {
  defaultSubscriptionValues,
  subscriptionSchema,
} from "@/utils/validation/subscriptionValidation";
import DeliveryOptions from "./deliveryOptions/DeliveryOptions";
import SubscribeProgressBar from "./subscribeProgressBar/SubscribeProgressBar";
import { subscribeStepMap } from "@/constants";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import { useCallback, useState } from "react";
import { SubscriptionStep, SubscriptionValues } from "@/types";
import Header from "@/components/layout/header/Header";
import Chips from "@/components/ui/chips/Chips";
import * as styles from "./SubscriptionOrderSheet.css";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import RawFoodOptions from "./rawFoodOptions/RawFoodOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateSubscription } from "@/api/subscription/mutations/useCreateSubscription";
import { useSubscriptionCalculation } from "@/hooks/subscription/useSubscriptionCalculation";
import { useGetSubscriptionOrderSheet } from "@/api/subscription/queries/useGetSubscriptionOrderSheet";
import { getPlanFromMealAndDelivery } from "@/utils/subscription/getPlanFromMealAndDelivery";
import { useUpdateSubscription } from "@/api/subscription/mutations/useUpdateSubscription";

interface SubscriptionOrderSheetProps {
  surveyId: number;
}

export default function SubscriptionOrderSheet({
  surveyId,
}: SubscriptionOrderSheetProps) {
  const router = useRouter();
  const [step, setStep] = useState<SubscriptionStep>("rawFood");
  const { data: orderSheetData } = useGetSubscriptionOrderSheet(surveyId);
  const { mutate: createSubscription } = useCreateSubscription();
  const { mutate: updateSubscription } = useUpdateSubscription();

  useScrollToTop(step);

  const form = useForm<SubscriptionValues>({
    resolver: yupResolver(subscriptionSchema),
    defaultValues: defaultSubscriptionValues(),
    mode: "all",
  });

  const { control, handleSubmit } = form;
  const savedSelection = useWatch({
    control: control,
    name: "recipeList",
  });
  const mealPlan = useWatch({
    control: control,
    name: "mealPlan",
  });
  const deliveryPlan = useWatch({
    control: control,
    name: "deliveryPlan",
  });

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

  const onSubmit = (data: SubscriptionValues) => {
    const plan = getPlanFromMealAndDelivery(data.mealPlan, data.deliveryPlan);

    const recipeList = recipes.map((recipe) => ({
      recipeId: recipe.recipeId,
      originalPricePerMeal: recipe.pricePerMeal,
      totalOriginalPrice: recipe.originalPrice,
      gramsPerMeal: recipe.gramsPerMeal,
    }));

    // subscribeId가 있으면 updateSubscription, 없으면 createSubscription
    if (orderSheetData.subscribeId) {
      const updateBody = {
        subscribeId: orderSheetData.subscribeId,
        body: {
          plan,
          recipeList,
        },
      };

      console.log("updateBody", updateBody);
      updateSubscription(updateBody, {
        onSuccess: () => {
          router.push(`/checkout/subscription/${orderSheetData.subscribeId}`);
        },
      });
    } else {
      const createBody = {
        body: {
          petId: orderSheetData.petId,
          plan,
          recipeList,
        },
      };

      console.log("createBody", createBody);
      createSubscription(createBody, {
        onSuccess: (data) => {
          router.push(`/checkout/subscription/${data.subscribeId}`);
        },
      });
    }
  };

  console.log("orderSheetData", orderSheetData);
  console.log("watch", form.watch());

  const primaryLabel = step === "deliveryCycle" ? "결제하러 가기" : "주문하기";
  const handleAction =
    step === "deliveryCycle" ? handleSubmit(onSubmit) : handleNext;

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
          <RawFoodOptions orderSheetData={orderSheetData} />
        )}
        {step === "deliveryCycle" && (
          <DeliveryOptions
            orderSheetData={orderSheetData}
            calculatedRecipes={recipes}
            mealPlan={mealPlan}
            deliveryPlan={deliveryPlan}
            totalOriginalPrice={totals.totalOriginalPrice}
            totalPlanDiscountedPrice={totals.totalPlanDiscountedPrice}
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
