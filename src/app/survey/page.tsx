"use client";

import Header from "@/components/layout/header/Header";
import useForm from "@/hooks/useForm";
import { SurveyFormData } from "@/types/survey";
import { initialSurveyValue } from "@/constants";
import SurveyForm from "@/components/survey/surveyForm/SurveyForm";
import SurveyPagination from "@/components/survey/surveyPagination/SurveyPagination";
import useStep from "@/hooks/useStep";
import { getSurveySteps } from "@/components/survey/surveySteps/SurveySteps";

export default function SurveyPage() {
  const { formData, handleChange } =
    useForm<SurveyFormData>(initialSurveyValue);
  // survey step 컴포넌트 불러오기
  const steps = getSurveySteps({ formData, handleChange });
  const {
    currentStep,
    handleNextStep,
    handlePrevStep,
    direction,
    isLastStep,
    isFirstStep,
  } = useStep(steps.length);
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
      />
    </>
  );
}
