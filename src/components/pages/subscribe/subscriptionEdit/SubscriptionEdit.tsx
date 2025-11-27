"use client";

import { commonWrapper, paddingStyles } from "@/styles/common.css";
import { calculateDeliveryCyclePackCount } from "@/utils/subscription/calculateRecipe";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import useModal from "@/hooks/useModal";
import PlanBottomSheet from "./bottomSheet/PlanBottomSheet";
import { FormProvider, useForm, useWatch } from "react-hook-form";
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
import { buildRecipeCatalog } from "@/utils/subscription/buildRecipeCatalog";
import { useSubscriptionCalculation } from "@/hooks/subscription/useSubscriptionCalculation";
import { useToastStore } from "@/store/useToastStore";

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
  const [isAgreeSubscription, setIsAgreeSubscription] =
    useState<boolean>(false);
  const { isOpen, onClose, onToggle } = useModal();
  const addToast = useToastStore((s) => s.addToast);
  // API queries
  const { data: subscriptionInfo } = useGetSubscriptionInfo(subscribeId);
  const { data: orderSheetData } = useGetSubscriptionOrderSheet(surveyId);
  const { mutate: updateSubscription } = useUpdateSubscription();

  const recipeCatalog = useMemo(
    () => buildRecipeCatalog(orderSheetData),
    [orderSheetData]
  );

  console.log("subscriptionInfo", subscriptionInfo);

  // Form setup
  const stableDefaultValues = useMemo(() => defaultSubscriptionValues(), []);
  const form = useForm<SubscriptionValues>({
    resolver: yupResolver(subscriptionSchema),
    defaultValues: stableDefaultValues,
    mode: "all",
  });

  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = form;

  const [mealPlan, deliveryPlan, recipeList] = useWatch({
    control,
    name: ["mealPlan", "deliveryPlan", "recipeList"],
  });

  const { recipes, totals, recipeCount } = useSubscriptionCalculation({
    savedSelection: recipeList,
    mealPlan,
    deliveryPlan,
  });

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
    if (!isAgreeSubscription) {
      addToast("약관에 동의해주세요", "above-button");
      return;
    }
    const plan = getPlanFromMealAndDelivery(data.mealPlan, data.deliveryPlan);

    const updateBody = {
      subscribeId,
      body: {
        plan,
        recipeList: recipes.map((recipe) => ({
          recipeId: recipe.recipeId,
          gramsPerMeal: recipe.gramsPerMeal,
          originalPricePerMeal: recipe.pricePerMeal,
          totalOriginalPrice: recipe.originalPrice,
        })),
        isAgreeSubscription,
      },
    };

    updateSubscription(updateBody, {
      onSuccess: () => {
        router.push("/diet-analysis"); // 구독 상세 페이지 완료되면 수정
      },
      onError: (error) => {
        addToast("구독 변경에 실패했어요", "above-button");
      },
    });
  };

  const handleOpenPlanSheet = () => onToggle();
  const handleGoToEdit = () => setStep("edit");
  const handleAction = step === "confirm" ? handleSubmit(onSubmit) : handleNext;

  return (
    <FormProvider {...form}>
      <Header onBack={handleBack} showBackButton centerTitle="식단 변경" />
      <div
        className={commonWrapper({
          backgroundColors: "gray50",
          paddingBottom: 85,
          direction: "col",
          minHeight: "fullWithHeader",
          justify: "start",
        })}
      >
        {step === "summary" && (
          <SubscriptionEditSummary
            subscriptionCount={subscriptionInfo.subscriptionCount}
            mealPlan={mealPlan}
            deliveryPlan={deliveryPlan}
            packCount={packCount}
            onOpenPlanSheet={handleOpenPlanSheet}
            onGoToEdit={handleGoToEdit}
            recipeCatalog={recipeCatalog}
            calculatedRecipes={recipes}
          />
        )}
        {step === "edit" && orderSheetData && (
          <RawFoodOptions orderSheetData={orderSheetData} isEdit />
        )}
        {step === "confirm" && (
          <SubscriptionEditConfirm
            currentSubscriptionInfo={subscriptionInfo}
            mealPlan={mealPlan}
            deliveryPlan={deliveryPlan}
            packCount={packCount}
            recipeCatalog={recipeCatalog}
            totalRecipePrice={totals}
            calculatedRecipes={recipes}
            isAgree={isAgreeSubscription}
            setIsAgree={setIsAgreeSubscription}
          />
        )}
        {isOpen && <PlanBottomSheet isOpen={isOpen} onClose={onClose} />}
        <ButtonDocked
          primaryButtonLabel={
            step === "confirm" ? "변경 완료" : "식단 변경하기"
          }
          onPrimaryClick={handleAction}
          type="full-button"
          isPrimaryDisabled={!isDirty}
          {...(step == "edit" && recipeCount > 0
            ? { primaryCount: recipeCount }
            : {})}
        />
      </div>
    </FormProvider>
  );
}
