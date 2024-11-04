"use client";

import Header from "@/components/layout/header/Header";
import useSurveyForm from "@/hooks/useSuveyForm";
import { useSurveyStore } from "@/store/useSurveyStore";
import useStep from "@/hooks/useStep";
import { getSurveySteps } from "@/components/pages/survey/surveySteps/SurveySteps";
import SurveyForm from "@/components/pages/survey/surveyForm/SurveyForm";
import SurveyPagination from "@/components/pages/survey/surveyPagination/SurveyPagination";
import * as styles from './Survey.css';

export default function SurveyPage() {
  const { stepLength, canNextStep } = useSurveyStore();
  const {
    currentStep,
    handleNextStep,
    handlePrevStep,
    direction,
    isLastStep,
    isFirstStep,
  } = useStep(stepLength());
  const { formData, errorMessages, handleChange, handleBlur, handleKeyDown } =
  useSurveyForm(handleNextStep, currentStep);
  const steps = getSurveySteps({
    formData,
    errorMessages,
    handleChange,
    handleBlur,
    handleKeyDown,
  });


  return (
    <div className={styles.surveyLayoutContainer}>
      <Header type="redBackground" />
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
        canNextStep={canNextStep}
      />
    </div>
  );
}
