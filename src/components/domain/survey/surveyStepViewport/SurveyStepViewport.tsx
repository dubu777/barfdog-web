"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MOTION } from "@/constants/motion";
import { ReactNode } from "react";
import {
  surveyFormContainer,
  surveyFormWrapper,
} from "./SurveyStepViewport.css";

interface SurveyFormProps {
  currentStep: number;
  direction: number;
  steps: ReactNode[];
}

export default function SurveyStepViewport({
  currentStep,
  direction,
  steps,
}: SurveyFormProps) {
  const currentStepIndex = currentStep - 1;
  const currentStepElement = steps[currentStepIndex];

  return (
    <section className={surveyFormContainer}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          className={surveyFormWrapper}
          key={currentStep}
          variants={MOTION.SURVEY_STEP}
          initial={direction === 1 ? "hiddenRight" : "hiddenLeft"}
          animate="visible"
          custom={direction}
        >
          {currentStepElement}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
