"use client";

import { paddingStyles } from "@/styles/common.css";
import { calculateDeliveryCyclePackCount } from "@/utils/subscription/calculateRecipe";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import useModal from "@/hooks/useModal";
import PlanBottomSheet from "./bottomSheet/PlanBottomSheet";
import { FormProvider, useForm } from "react-hook-form";
import {
  defaultSubscriptionValues,
  subscriptionSchema,
} from "@/utils/validation/subscriptionValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import SubscriptionEditSummary from "./summary/SubscriptionEditSummary";
import { useEffect, useMemo, useState } from "react";
import { SubscriptionEditStep, SubscriptionValues } from "@/types";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header/Header";
import RawFoodOptions from "../rawFoodOptions/RawFoodOptions";
import SubscriptionEditConfirm from "./confirm/SubscriptionEditConfirm";
import { buildInitialSubscriptionForm } from "@/utils/subscription/buildInitialSubscriptionForm";
import { useGetSubscriptionInfo } from "@/api/subscription/queries/useGetSubscriptionInfo";
import { useGetSubscriptionOrderSheet } from "@/api/subscription/queries/useGetSubscriptionOrderSheet";
import { useUpdateSubscription } from "@/api/subscription/mutations/useUpdateSubscription";
import { getPlanFromMealAndDelivery } from "@/utils/subscription/getPlanFromMealAndDelivery";

interface SubscriptionEditProps {
  subscribeId: number;
  surveyId: number;
}

export default function SubscriptionEdit({
  subscribeId,
  surveyId,
}: SubscriptionEditProps) {
  // Router and state
  const router = useRouter();
  const [step, setStep] = useState<SubscriptionEditStep>("summary");
  const { isOpen, onClose, onToggle } = useModal();

  // API queries
  const { data: subscriptionInfo } = useGetSubscriptionInfo(subscribeId);
  const { data: orderSheetData } = useGetSubscriptionOrderSheet(surveyId);
  const { mutate: updateSubscription } = useUpdateSubscription();

  console.log(subscriptionInfo);

  // Form setup
  const stableDefaultValues = useMemo(() => defaultSubscriptionValues(), []);
  const form = useForm<SubscriptionValues>({
    resolver: yupResolver(subscriptionSchema),
    defaultValues: stableDefaultValues,
    mode: "all",
  });

  const {
    watch,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = form;

  // Form initialization with subscription data
  useEffect(() => {
    if (!subscriptionInfo) return;
    const initialValues = buildInitialSubscriptionForm(subscriptionInfo);
    reset(initialValues);
  }, [subscriptionInfo, reset]);

  useScrollToTop(step);
  console.log(watch());

  const packCount = subscriptionInfo
    ? calculateDeliveryCyclePackCount(
        subscriptionInfo.planInfo.mealCount,
        subscriptionInfo.planInfo.weeks,
        subscriptionInfo.recipeList.length
      )
    : 0;

  // Event handlers
  const handleNext = () => {
    if (step === "summary") {
      setStep("confirm");
    } else if (step === "edit") {
      setStep("summary");
    }
  };

  const handleBack = () => {
    if (step === "summary") {
      router.back();
    } else if (step === "edit") {
      setStep("summary");
    } else if (step === "confirm") {
      setStep("summary");
    }
  };

  const onSubmit = (data: SubscriptionValues) => {
    const plan = getPlanFromMealAndDelivery(data.mealPlan, data.deliveryPlan);

    const updateBody = {
      subscribeId,
      body: {
        plan,
        recipeList: data.recipeList.map((recipe) => ({
          recipeId: recipe.recipeId,
          oneMealGramsPerRecipe: recipe.packGrams,
          originalPrice: recipe.packPrice,
        })),
        isAgreeSubscription: data.isAgreeSubscription || false,
      },
    };

    updateSubscription(updateBody, {
      onSuccess: () => {
        router.push("/diet-analysis"); // 구독 상세 페이지 완료되면 수정
      },
      onError: (error) => {
        console.error("구독 변경 실패:", error);
      },
    });
  };

  const handleOpenPlanSheet = () => onToggle();
  const handleGoToEdit = () => setStep("edit");
  const handleAction = step === "confirm" ? handleSubmit(onSubmit) : handleNext;

  return (
    <FormProvider {...form}>
      <div className={paddingStyles({ bottom: 85 })}>
        <Header onBack={handleBack} showBackButton centerTitle="식단 변경" />
        {step === "summary" && (
          <SubscriptionEditSummary
            currentSubscriptionInfo={subscriptionInfo}
            packCount={packCount}
            onOpenPlanSheet={handleOpenPlanSheet}
            onGoToEdit={handleGoToEdit}
          />
        )}
        {step === "edit" && orderSheetData && (
          <RawFoodOptions orderSheetData={orderSheetData} isEdit />
        )}
        {step === "confirm" && (
          <SubscriptionEditConfirm
            currentSubscriptionInfo={subscriptionInfo}
            packCount={packCount}
          />
        )}
        {isOpen && <PlanBottomSheet isOpen={isOpen} onClose={onClose} />}
        <ButtonDocked
          primaryButtonLabel="식단 변경하기"
          onPrimaryClick={handleAction}
          type="full-button"
          isPrimaryDisabled={!isDirty}
        />
      </div>
    </FormProvider>
  );
}
