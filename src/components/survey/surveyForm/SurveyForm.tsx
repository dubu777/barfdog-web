"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SurveyFormData } from "@/types/survey";
import SurveyStep1 from "../surveySteps/SurveyStep1";
import SurveyStep2 from "../surveySteps/SurveyStep2";
import useStep from "@/hooks/useStep";
import { sectionVariants } from "@/constants/motion";

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
      <div>
        {!isFirstStep && <button onClick={handlePrevStep}>이전</button>}
        {!isLastStep ? (
          <button onClick={handleNextStep}>다음</button>
        ) : (
          <button>제출</button>
        )}
      </div>
    </div>
  );
}
