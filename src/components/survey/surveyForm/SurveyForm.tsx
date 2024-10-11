"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SurveyFormData } from "@/types/survey";
import SurveyStep1 from "../surveySteps/SurveyStep1";
import SurveyStep2 from "../surveySteps/SurveyStep2";
import useStep from "@/hooks/useStep";
import { sectionVariants } from "@/constants/motion";
import SurveyPagination from "../surveyPagination/SurveyPagination";

interface SurveyFormProps {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K]
  ) => void;
}

export default function SurveyForm({
  formData,
  handleChange,
}: SurveyFormProps) {
  const steps = [
    <SurveyStep1 formData={formData} handleChange={handleChange} />,
    <SurveyStep2 formData={formData} handleChange={handleChange} />,
  ];
console.log(formData);

  const {
    currentStep,
    handleNextStep,
    handlePrevStep,
    direction,
    isLastStep,
    isFirstStep,
  } = useStep(steps.length);

  return (
    // 테스트용 스타일
    <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentStep}
          variants={sectionVariants}
          initial={direction === 1 ? "hiddenRight" : "hiddenLeft"}
          animate="visible"
          custom={direction}
        >
          {steps[currentStep]}
        </motion.div>
      </AnimatePresence>
      <SurveyPagination 
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
          isLastStep={isLastStep}
          isFirstStep={isFirstStep}
      />
    </div>
  );
}