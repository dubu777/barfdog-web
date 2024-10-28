"use client";

import Header from "@/components/layout/header/Header";
import useForm from "@/hooks/useForm";
import SurveyForm from "@/components/survey/surveyForm/SurveyForm";
import SurveyPagination from "@/components/survey/surveyPagination/SurveyPagination";
import useStep from "@/hooks/useStep";
import { getSurveySteps } from "@/components/survey/surveySteps/SurveySteps";
import { useSurveyStore } from "@/store/useSurveyStore";
import { StepProgressBar } from "@/components/survey/stepProgressBar/StepProgressBar";

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
    useForm(handleNextStep, currentStep);
  const steps = getSurveySteps({
    formData,
    errorMessages,
    handleChange,
    handleBlur,
    handleKeyDown,
  });
  console.log(formData, "form");

  return (
    <>
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
    </>
  );
}
