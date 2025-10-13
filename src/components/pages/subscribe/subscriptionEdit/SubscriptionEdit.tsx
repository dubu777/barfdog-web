"use client";

import { useGetSubscriptionDetailV2 } from "@/api/subscription/queries/useGetSubscriptionDetailV2";
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
import { useGetRawFoodOrderSheet } from "@/api/subscription/queries/useGetRawFoodOrderSheet";
import SubscriptionEditConfirm from "./confirm/SubscriptionEditConfirm";
import { buildInitialSubscriptionForm } from "@/utils/subscription/buildInitialSubscriptionForm";

interface SubscriptionEditProps {
  reportId: number;
}

export default function SubscriptionEdit({ reportId }: SubscriptionEditProps) {
  // Router and state
  const router = useRouter();
  const [step, setStep] = useState<SubscriptionEditStep>("summary");
  const { isOpen, onClose, onToggle } = useModal();

  // API queries
  const { data: detailData } = useGetSubscriptionDetailV2(reportId);
  const { data: rawFoodSheetData } = useGetRawFoodOrderSheet(reportId);

  // Form setup
  const stableDefaultValues = useMemo(() => defaultSubscriptionValues(), []);
  const form = useForm<SubscriptionValues>({
    resolver: yupResolver(subscriptionSchema),
    defaultValues: stableDefaultValues,
    mode: "all",
  });

  // Form initialization with subscription data
  useEffect(() => {
    if (!detailData) return;
    const initialValues = buildInitialSubscriptionForm(detailData);
    form.reset(initialValues);
  }, [detailData, form]);

  useScrollToTop(step);

  // Computed values
  const editableSeq = detailData?.next
    ? detailData.subscriptionCount + 1
    : detailData?.subscriptionCount;

  const packCount = detailData
    ? calculateDeliveryCyclePackCount(
        detailData.mealPlan,
        detailData.deliveryPlan,
        detailData.rawFoods.length
      )
    : 0;

  // Event handlers
  const handleNext = () => {
    if (step === "summary") {
      setStep("edit");
    } else if (step === "edit") {
      setStep("confirm");
    }
  };

  const handleBack = () => {
    if (step === "summary") {
      router.back();
    } else if (step === "edit") {
      setStep("summary");
    } else if (step === "confirm") {
      setStep("edit");
    }
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  const handleOpenPlanSheet = () => onToggle();
  const handleGoToEdit = () => setStep("edit");
  const handleAction = step === "confirm" ? handleSubmit : handleNext;

  return (
    <FormProvider {...form}>
      <div className={paddingStyles({ bottom: 85 })}>
        <Header onBack={handleBack} showBackButton centerTitle="식단 변경" />
        {step === "summary" && (
          <SubscriptionEditSummary
            mealPlan={detailData.mealPlan}
            deliveryPlan={detailData.deliveryPlan}
            packCount={packCount}
            editableSeq={editableSeq}
            rawFoods={detailData.rawFoods}
            onOpenPlanSheet={handleOpenPlanSheet}
            onGoToEdit={handleGoToEdit}
          />
        )}
        {step === "edit" && rawFoodSheetData && (
          <RawFoodOptions rawFoodSheetData={rawFoodSheetData} />
        )}
        {step === "confirm" && <SubscriptionEditConfirm />}
        {isOpen && <PlanBottomSheet isOpen={isOpen} onClose={onClose} />}
        <ButtonDocked
          primaryButtonLabel="식단 변경하기"
          onPrimaryClick={handleAction}
          type="full-button"
          isPrimaryDisabled={true}
        />
      </div>
    </FormProvider>
  );
}
