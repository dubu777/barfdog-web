"use client";

import * as styles from "./Survey.css";
import { useSurveyNavigator } from "@/hooks/survey/useSurveyNavigator";
import {
  defaultStepValues,
  SurveyStepKeys,
  surveyStepsSchema,
} from "@/utils/validation/surveyValidation";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import SurveyProgressBar from "@/components/common/survey/surveyProgressBar/SurveyProgressBar";
import {
  CRITICAL_DISEASES,
  SURVEY_NO_AUTO_STEP,
  SURVEY_SECTIONS,
} from "@/constants";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import useModal from "@/hooks/useModal";
import { useCallback, useMemo, useState } from "react";
import SurveyResultLoading from "../resultLoading/SurveyResultLoading";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header/Header";
import { buildDietAnalysisPayload } from "@/utils/healthNote/buildDietAnalysisPayload";
import { useCreateDietAnalysisResult } from "@/api/dietAnalysis/mutations/useCreateDietAnalysisResult";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SkipCondition, useSurveyStep } from "@/hooks/survey/useSurveyStep";
import SurveyStepViewport from "@/components/common/survey/surveyStepViewport/SurveyStepViewport";
import { getSurveySteps } from "../steps/StepsElements";
import CriticalDiseaseAlertBottomSheet from "../bottomSheet/CriticalDiseaseAlertBottomSheet";
import { DietAnalysisFormValues } from "@/types/dietAnalysis";
import { Gender } from "@/types";

const CRITICAL_SET = new Set(CRITICAL_DISEASES.map((cd) => cd.value));

interface SurveyPageContainerProps {
  petName: string;
  petId: number;
  gender: Gender;
  isResurvey: boolean;
}

export default function SurveyPageContainer({
  petName,
  petId,
  gender,
  isResurvey,
}: SurveyPageContainerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: submitResult } = useCreateDietAnalysisResult({
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (response) => {
      const reportId = response.data;
      // 로딩 화면 2초 렌더링 후에 결과 페이지로 이동
      setTimeout(() => {
        router.push(`/diet-analysis/result/${reportId}`);
      }, 2000);
    },
    onError: (err) => {
      console.error(err);
      setIsLoading(false);
    },
  });

  const methods = useForm<yup.InferType<typeof surveyStepsSchema>>({
    resolver: yupResolver(surveyStepsSchema),
    defaultValues: defaultStepValues,
    mode: "all",
  });
  const {
    control,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = methods;

  const stepKeys = Object.keys(defaultStepValues) as SurveyStepKeys[];

  const neutralization = useWatch({ name: "step1.neutralization", control });

  const skipConditions = useMemo<SkipCondition<SurveyStepKeys>[]>(
    () => [
      {
        from: "step3",
        to: "step6",
        predicate: () => gender === "MALE" || neutralization === true,
      },
    ],
    [gender, neutralization]
  );

  const {
    currentStep,
    currentStepKey,
    handleNextStep,
    handlePrevStep,
    isLastStep,
    isFirstStep,
    direction,
  } = useSurveyStep<SurveyStepKeys>(stepKeys, skipConditions);

  const { isCanNextStep, handleChange, handleBlur, handleKeyDown } =
    useSurveyNavigator({
      methods,
      currentStepKey,
      handleNextStep,
      noAutoStepSet: SURVEY_NO_AUTO_STEP,
      optionalField: {},
    });

  const steps = getSurveySteps({
    handleChange,
    handleBlur,
    handleKeyDown,
    handleNextStep,
    dogName: petName,
    isResurvey,
  });

  console.log("watch", watch());
  console.log("errors", errors);

  const { isOpen, onClose, onToggle } = useModal();

  // 공통 설문 제출 함수
  const submitSurveyAndNavigate = useCallback(async () => {
    if (!(await trigger())) return;

    const values = getValues();
    setIsLoading(true);

    const payload = buildDietAnalysisPayload(
      values as DietAnalysisFormValues,
      petId
    );
    console.log("payload", payload);

    submitResult(payload);
  }, [trigger, getValues, submitResult, router]);

  const handleContinue = useCallback(async () => {
    onClose();
    await submitSurveyAndNavigate();
  }, [onClose, submitSurveyAndNavigate]);

  const handleSurveySubmit = useCallback(async () => {
    if (!(await trigger())) return;

    const values = getValues();
    const { healthIssues } = values.step13;

    if (healthIssues.some((d: string) => CRITICAL_SET.has(d))) {
      onToggle();
      return;
    }

    await submitSurveyAndNavigate();
  }, [trigger, getValues, onToggle, submitSurveyAndNavigate]);

  const handleFooterButtonClick = () => {
    if (isLastStep) {
      handleSurveySubmit();
    } else {
      handleNextStep();
    }
  };

  if (isLoading) {
    return <SurveyResultLoading petName={petName} />;
  }

  return (
    <div className={styles.surveyLayoutContainer}>
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
      <SurveyProgressBar currentStep={currentStep} sections={SURVEY_SECTIONS} />
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
      <CriticalDiseaseAlertBottomSheet
        isOpen={isOpen}
        onClose={onClose}
        onConsult={onClose}
        onContinue={handleContinue}
      />
    </div>
  );
}
