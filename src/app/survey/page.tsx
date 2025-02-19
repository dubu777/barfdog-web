"use client";

import useSurveyStep from "@/hooks/useSurveyStep";
import { getSurveySteps } from "@/components/pages/survey/surveySteps/SurveySteps";
import SurveyForm from "@/components/pages/survey/surveyForm/SurveyForm";
import SurveyPagination from "@/components/pages/survey/surveyPagination/SurveyPagination";
import * as styles from "./Survey.css";
import { useSurveyForm } from "@/hooks/useSurveyForm";
import {
  defaultStepValues,
  surveyStepsSchema,
} from "@/utils/validation/surveyValidation";

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

  const {
    handleSubmit,
    control,
    watch,
    errors,
    isValid,
    isCanNextStep,
    handleChange,
    handleBlur,
    handleKeyDown,
  } = useSurveyForm<typeof surveyStepsSchema>(
    surveyStepsSchema,
    defaultStepValues,
    currentStepKey,
    handleNextStep
  );

  const petName = watch("step1.name") ?? "";
  const steps = getSurveySteps({
    handleChange,
    handleBlur,
    handleKeyDown,
    handleNextStep,
    control,
    errors,
    petName,
  });

  console.log("watch", watch());
  console.log("errors", errors);

  return (
    <div className={styles.surveyLayoutContainer}>
      <SurveyForm
        currentStep={currentStep}
        direction={direction}
        steps={steps}
      />
      <SurveyPagination
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
        isLastStep={isLastStep}
        isFirstStep={isFirstStep}
        currentStep={currentStep}
        stepLength={steps.length}
        canNextStep={isCanNextStep}
      />
    </div>
  );
}
