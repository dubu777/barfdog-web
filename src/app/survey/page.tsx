"use client";

import Header from "@/components/layout/header/Header";
import useForm from "@/hooks/useForm";
import SurveyForm from "@/components/survey/surveyForm/SurveyForm";
import SurveyPagination from "@/components/survey/surveyPagination/SurveyPagination";
import useStep from "@/hooks/useStep";
import { getSurveySteps } from "@/components/survey/surveySteps/SurveySteps";
import { useSurveyStore } from "@/store/useSurveyStore";
import { StepProgressBar } from "@/components/survey/stepProgressBar/StepProgressBar";
import { SURVEY_FORM_INFO } from "@/constants";

type StepKey = keyof typeof SURVEY_FORM_INFO;


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
  // const steps = getSurveySteps({
  //   formData,
  //   errorMessages,
  //   handleChange,
  //   handleBlur,
  //   handleKeyDown,
  // });
  // console.log(formData, "form");

  const getStepData = (step: number) => {
    const stepKey = `step${step}` as StepKey;
    return SURVEY_FORM_INFO[stepKey];
  };
  
  const currentStepData = getStepData(currentStep);
  return (
    <>
      <Header type="redBackground" />
      <SurveyForm
        currentStep={currentStep}
        direction={direction}
        stepData={currentStepData}
      />
      <SurveyPagination
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
        isLastStep={isLastStep}
        isFirstStep={isFirstStep}
        currentStep={currentStep}
        stepLength={Object.keys(SURVEY_FORM_INFO).length}
        canNextStep={canNextStep}
      />
    </>
  );
}
