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
import NewHeader from "@/components/layout/newHeader/NewHeader";
import { FormProvider } from "react-hook-form";
import SurveyProgressBar from "@/components/pages/survey/surveyProgressBar/SurveyProgressBar";
import { CRITICAL_DISEASES, SURVEY_SECTIONS } from "@/constants";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import useModal from "@/hooks/useModal";
import CriticalDiseaseAlertBottomSheet from "@/components/pages/survey/bottomSheet/CriticalDiseaseAlertBottomSheet";
import { useState } from "react";
import SurveyResultLoading from "../surveyResultLoading/SurveyResultLoading";
import { useRouter } from "next/navigation";

export default function SurveyPageContainer() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    currentStep,
    currentStepKey,
    handleNextStep,
    handlePrevStep,
    direction,
    isLastStep,
    isFirstStep,
  } = useSurveyStep(14);

  const surveyFormMethods = useSurveyForm<typeof surveyStepsSchema>(
    surveyStepsSchema,
    defaultStepValues,
    currentStepKey,
    handleNextStep
  );

  const petName = surveyFormMethods.watch("step1.name") ?? "";

  const steps = getSurveySteps({
    handleChange: surveyFormMethods.handleChange,
    handleBlur: surveyFormMethods.handleBlur,
    handleKeyDown: surveyFormMethods.handleKeyDown,
    handleNextStep: handleNextStep,
    petName,
  });

  console.log("watch", surveyFormMethods.watch());
  console.log("errors", surveyFormMethods.errors);

  const {isOpen, onClose, onToggle} = useModal();
  
  const navigateToResult = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push('/');
    }, 2000);
  }

  const handleContinue = () => {
    onClose();
    navigateToResult()
  };

  // 임시 설문 제출 함수
  const handleSurveySubmit = async () => {
    const isValid = await surveyFormMethods.trigger();
    if (!isValid) return;
    
    const values = surveyFormMethods.getValues();
    const selected = values.step14.healthIssues;

    const criticalValues = new Set(CRITICAL_DISEASES.map((cd) => cd.value));

    const hasCriticalDiseases = selected.some((disease) =>
      criticalValues.has(disease)
    );

    if (hasCriticalDiseases) {
      onToggle();
      return;
    }

    navigateToResult();
  };



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
      <NewHeader
        leftElement={
          !isFirstStep && (
            <DefaultText type="headline3" color="gray700">
              이전
            </DefaultText>
          )
        }
        showBackButton={!isFirstStep}
        showCloseButton
        onBack={handlePrevStep}
        backgroundColor="gray50"
        leftSlotGap="sm"
      />
      <SurveyProgressBar currentStep={currentStep} sections={SURVEY_SECTIONS} />
      <FormProvider {...surveyFormMethods}>
        <SurveyForm
          currentStep={currentStep}
          direction={direction}
          steps={steps}
        />
      </FormProvider>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel={isLastStep ? "제출" : "다음"}
        onPrimaryClick={handleFooterButtonClick}
        isPrimaryDisabled={!surveyFormMethods.isCanNextStep}
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
