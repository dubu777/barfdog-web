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

export default function SurveyPage() {
  const {
    currentStep,
    currentStepKey,
    handleNextStep,
    handlePrevStep,
    direction,
    isLastStep,
    isFirstStep,
  } = useSurveyStep(17);

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
      <NewHeader leftTitle="이전" showBackButton showCloseButton />
      <FormProvider {...surveyFormMethods}>
      <SurveyForm
        currentStep={currentStep}
        direction={direction}
        steps={steps}
      />
      </FormProvider>
      <SurveyPagination
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
        isLastStep={isLastStep}
        isFirstStep={isFirstStep}
        currentStep={currentStep}
        stepLength={steps.length}
        canNextStep={surveyFormMethods.isCanNextStep}
      />
    </div>
  );
}
