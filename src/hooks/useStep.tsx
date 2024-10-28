'use client'
import { useState } from 'react';

interface UseStepReturnType {
  currentStep: number;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  direction: number;
}

export default function useStep(totalSteps: number): UseStepReturnType {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
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

  return {
    currentStep,
    handleNextStep,
    handlePrevStep,
    direction,
    isLastStep: currentStep === totalSteps - 1,
    isFirstStep: currentStep === 0,
  };
}
