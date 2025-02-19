'use client'
import { SurveyStepKeys } from '@/utils/validation/surveyValidation';
import { useState } from 'react';

interface useSurveyStepReturnType {
  currentStep: number;
  currentStepKey: SurveyStepKeys;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  direction: number;
}

export default function useSurveyStep(totalSteps: number): useSurveyStepReturnType {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const currentStepKey = `step${currentStep}` as SurveyStepKeys
  return {
    currentStep,
    currentStepKey,
    handleNextStep,
    handlePrevStep,
    direction,
    isLastStep: currentStep === totalSteps,
    isFirstStep: currentStep === 1,
  };
}
