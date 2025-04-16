"use client";

import useSurveyStep from "@/hooks/survey/useSurveyStep";
import { getSurveySteps } from "@/components/pages/survey/surveySteps/SurveySteps";
import SurveyForm from "@/components/pages/survey/surveyForm/SurveyForm";
import SurveyPagination from "@/components/pages/survey/surveyPagination/SurveyPagination";
import * as styles from "./Survey.css";
import { useSurveyForm } from "@/hooks/survey/useSurveyForm";
import {
  defaultStepValues,
  surveyStepsSchema,
} from "@/utils/validation/surveyValidation";
import NewHeader from "@/components/layout/newHeader/NewHeader";
import { FormProvider } from "react-hook-form";
import SurveyProgressBar from "@/components/pages/survey/surveyProgressBar/SurveyProgressBar";
import { SURVEY_SECTIONS } from "@/constants";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";

export default function SurveyPage() {
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

  return (
    <div className={styles.surveyLayoutContainer}>
      <NewHeader
        leftElement={
          currentStep > 1 && (
            <DefaultText type="headline3" color="gray700">
              이전
            </DefaultText>
          )
        }
        showBackButton={currentStep > 1}
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
        primaryButtonLabel="다음"
        onPrimaryClick={handleNextStep}
        isPrimaryDisabled={!surveyFormMethods.isCanNextStep}
      />
      {/* <SurveyPagination
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
        isLastStep={isLastStep}
        isFirstStep={isFirstStep}
        canNextStep={surveyFormMethods.isCanNextStep}
      /> */}
    </div>
  );
}
