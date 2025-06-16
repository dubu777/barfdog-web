"use client";

import useSurveyStep from "@/hooks/survey/useSurveyStep";
import { getSurveySteps } from "@/components/pages/survey/surveySteps/SurveySteps";
import SurveyForm from "@/components/pages/survey/surveyForm/SurveyForm";
import * as styles from "./Survey.css";
import { useSurveyForm } from "@/hooks/survey/useSurveyForm";
import {
  defaultStepValues,
  surveyStepsSchema,
} from "@/utils/validation/surveyValidation";
import { FormProvider, useWatch } from "react-hook-form";
import SurveyProgressBar from "@/components/pages/survey/surveyProgressBar/SurveyProgressBar";
import { CRITICAL_DISEASES, surveySections } from "@/constants";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import useModal from "@/hooks/useModal";
import CriticalDiseaseAlertBottomSheet from "@/components/pages/survey/bottomSheet/CriticalDiseaseAlertBottomSheet";
import { useCallback, useEffect, useRef, useState } from "react";
import SurveyResultLoading from "../surveyResultLoading/SurveyResultLoading";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/layout/header/Header";
import { buildDietAnalysisPayload } from "@/utils/healthNote/buildDietAnalysisPayload";
import { useCreateDietAnalysisResult } from "@/api/dietAnalysis/mutations/useCreateDietAnalysisResult";

const CRITICAL_SET = new Set(CRITICAL_DISEASES.map((cd) => cd.value));

export default function SurveyPageContainer() {
  const router = useRouter();
  const params = useSearchParams();
  const isResurvey = params.get("mode") === "resurvey";

  const [isLoading, setIsLoading] = useState(false);
  const skipPregnancyRef = useRef(false);

  const { mutate: submitResult } = useCreateDietAnalysisResult({
    onSuccess: (response) => {
      const { surveyReportId } = response;
      router.push(`/diet-analysis/result/${surveyReportId}`);
    },
    onError: (err) => {
      console.log("에러>>>>>>>", err);
      setIsLoading(false);
    },
  });

  const {
    currentStep,
    currentStepKey,
    handleNextStep,
    handlePrevStep,
    direction,
    isLastStep,
    isFirstStep,
  } = useSurveyStep(14, skipPregnancyRef);

  const surveyForm = useSurveyForm<typeof surveyStepsSchema>(
    surveyStepsSchema,
    defaultStepValues,
    currentStepKey,
    handleNextStep
  );

  const {
    watch,
    handleChange,
    handleBlur,
    handleKeyDown,
    trigger,
    getValues,
    errors,
    isCanNextStep,
    control,
  } = surveyForm;

  const petName = useWatch({ name: "step1.name", control }) ?? "";
  const gender = useWatch({ name: "step1.gender", control });
  const neutralization = useWatch({ name: "step1.neutralization", control });
  useEffect(() => {
    skipPregnancyRef.current = gender === "MALE" || neutralization === true;
  }, [gender, neutralization]);

  const steps = getSurveySteps({
    handleChange,
    handleBlur,
    handleKeyDown,
    handleNextStep,
    petName,
    isResurvey,
  });

  console.log("watch", watch());
  console.log("errors", errors);

  const { isOpen, onClose, onToggle } = useModal();

  const navigateToResult = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  const handleContinue = () => {
    onClose();
    navigateToResult();
  };

  // 임시 설문 제출 함수
  const handleSurveySubmit = useCallback(async () => {
    if (!(await trigger())) return;

    const values = getValues();
    const { healthIssues } = values.step14;

    if (healthIssues.some((d: string) => CRITICAL_SET.has(d))) {
      onToggle();
      return;
    }

    setIsLoading(true);
    const payload = buildDietAnalysisPayload(values);
    console.log("payload", payload);

    submitResult(payload);
  }, [trigger, getValues, onToggle, submitResult]);

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
      <SurveyProgressBar currentStep={currentStep} sections={surveySections} />
      <FormProvider {...surveyForm}>
        <SurveyForm
          currentStep={currentStep}
          direction={direction}
          steps={steps}
        />
      </FormProvider>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel={isLastStep ? "결과 보기" : "다음"}
        onPrimaryClick={handleFooterButtonClick}
        isPrimaryDisabled={!isCanNextStep}
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
