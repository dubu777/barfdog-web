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

export default function useSurveyStep(totalSteps: number, skipPregnancyRef: React.RefObject<boolean>): useSurveyStepReturnType {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);

  const handleNextStep = () => {
      setDirection(1);
      if (skipPregnancyRef.current && currentStep === 4) {
        setCurrentStep(7);
      }
      // 일반 +1
      else if (currentStep < totalSteps) {
        setCurrentStep((p) => p + 1);
      }
  };

  const handlePrevStep = () => {
      setDirection(-1);
      if (skipPregnancyRef.current && currentStep === 7) {
        setCurrentStep(4);
      }
      // 일반 -1
      else if (currentStep > 1) {
        setCurrentStep((p) => p - 1);
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
