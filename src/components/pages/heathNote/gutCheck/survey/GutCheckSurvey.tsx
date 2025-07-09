"use client";

import DefaultText from "@/components/common/defaultText/DefaultText";
import Header from "@/components/layout/header/Header";
import SurveyProgressBar from "@/components/common/survey/surveyProgressBar/SurveyProgressBar";
import {
  GUT_CHECK_NO_AUTO_STEP,
  GUT_CHECK_OPTIONAL_FIELDS,
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
import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { buildGutCheckStepElements } from "./steps/StepElements";
import SurveyStepViewport from "@/components/common/survey/surveyStepViewport/SurveyStepViewport";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { useCreateGutCheckResult } from "@/api/healthNote/mutations/useCreateGutCheckResult";
import { buildGutCheckPayload } from "@/utils/healthNote/buildGutCheckPayload";

export default function GutCheckSurvey() {
  const router = useRouter();
  const { mutate: submitResult } = useCreateGutCheckResult({
    onSuccess: (response) => {
      console.log("장내미생물 응답값", response);
    },
    onError: (err) => {
      console.log("에러>>>>>>>", err);
    },
  });

  // const gender = "FEMALE"; // 임시로, 실제로는 사용자 정보에서 가져와야 함
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

  const stepValues = watch();
  const stepErrors = errors;
  console.log("stepValues", stepValues);
  console.log("stepErrors", stepErrors);

  const stepKeys = Object.keys(defaultGutCheckStepValues) as GutCheckStepKeys[];

  // 임시로 추후에 개발할 step들을 스킵
  // const skipConditions = useMemo<SkipCondition<GutCheckStepKeys>[]>(
  //   () => [
  //     {
  //       from: "step4",
  //       to: "step6",
  //       predicate: () => true, // 임시
  //     },
  //   ],
  //   []
  // );

  const gender = "FEMALE";
  const skipConditions = useMemo<SkipCondition<GutCheckStepKeys>[]>(
    () => [
      {
        from: "step5",
        to: "step7",
        predicate: () => gender === "MALE", // 임시
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
  console.log("currentStep", currentStep);
  console.log("currentStepKey", currentStepKey);

  const { isCanNextStep, handleChange, handleBlur, handleKeyDown } =
    useSurveyNavigator({
      methods,
      currentStepKey,
      handleNextStep,
      noAutoStepSet: GUT_CHECK_NO_AUTO_STEP,
      optionalField: GUT_CHECK_OPTIONAL_FIELDS,
    });

  const steps = buildGutCheckStepElements({
    handleChange,
    handleBlur,
    handleKeyDown,
    handleNextStep,
    dogName,
  });

  const handleSurveySubmit = useCallback(async () => {
    if (!(await trigger())) return;

    const values = getValues();

    const payload = buildGutCheckPayload(values);
    console.log("payload", payload);

    submitResult(payload);
  }, [trigger, getValues, submitResult]);

  const handleFooterButtonClick = () => {
    if (isLastStep) {
      handleSurveySubmit();
    } else {
      handleNextStep();
    }
  };
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
        onClose={() => router.back()}
        onBack={handlePrevStep}
        backgroundColor="gray50"
        leftSlotGap="sm"
      />
      <SurveyProgressBar
        currentStep={currentStep}
        sections={GUT_CHECK_SECTIONS}
      />
      <FormProvider {...methods}>
        <SurveyStepViewport
          currentStep={currentStep}
          direction={direction}
          steps={steps}
        />
      </FormProvider>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel={isLastStep ? "결과 보기" : "다음"}
        onPrimaryClick={handleFooterButtonClick}
        isPrimaryDisabled={!isCanNextStep()}
      />
    </div>
  );
}
