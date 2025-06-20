"use client";

import DefaultText from "@/components/common/defaultText/DefaultText";
import Header from "@/components/layout/header/Header";
import SurveyProgressBar from "@/components/pages/survey/surveyProgressBar/SurveyProgressBar";
import {
  GUT_CHECK_NO_AUTO_STEP,
  GUT_CHECK_SECTIONS,
} from "@/constants/healthNote/gutCheck";
import { useSurveyNavigator } from "@/hooks/survey/useSurveyNavigator";
import { SkipCondition, useSurveyStep } from "@/hooks/survey/useSurveyStep";
import {
  defaultGutCheckStepValues,
  GutCheckStepKeys,
  gutCheckStepSchema,
} from "@/utils/validation/gutCheckValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

export default function GutCheckSurvey() {
  const router = useRouter();
  const gender = "MALE";
  const dogName = "임시데이터";

  const methods = useForm<yup.InferType<typeof gutCheckStepSchema>>({
    resolver: yupResolver(gutCheckStepSchema),
    defaultValues: defaultGutCheckStepValues,
    mode: "all",
  });

  const {
    control,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = methods;

  const stepKeys = Object.keys(defaultGutCheckStepValues) as GutCheckStepKeys[];
  const skipConditions = useMemo<SkipCondition<GutCheckStepKeys>[]>(
    () => [
      {
        from: "step5",
        to: "step7",
        predicate: () => gender === "MALE",
      },
    ],
    [gender]
  );

  const {
    currentStep,
    currentStepKey,
    handleNextStep,
    handlePrevStep,
    isLastStep,
    isFirstStep,
    direction,
  } = useSurveyStep<GutCheckStepKeys>(stepKeys, skipConditions);

  const { isCanNextStep, handleChange, handleBlur, handleKeyDown } =
    useSurveyNavigator({
      methods,
      currentStepKey,
      handleNextStep,
      noAutoStepSet: GUT_CHECK_NO_AUTO_STEP,
    });

  return (
    <div>
      <Header
        leftElement={
          !isFirstStep && (
            <DefaultText type="headline3" color="gray700">
              이전
            </DefaultText>
          )
        }
        showBackButton={!isFirstStep}
        showCloseButton
        onClose={() => router.push("/health-note/gut-check/create")}
        onBack={() => {}}
        backgroundColor="gray50"
        leftSlotGap="sm"
      />
      <SurveyProgressBar
        currentStep={currentStep}
        sections={GUT_CHECK_SECTIONS}
      />
      <FormProvider {...methods}>
        <div>장내미생물</div>
      </FormProvider>
    </div>
  );
}
