"use client";

import { motion, AnimatePresence } from "framer-motion";
import { sectionVariants } from "@/constants/motion";
import * as styles from "./SurveyForm.css";
import { ReactNode } from "react";
import { StepProgressBar } from "../stepProgressBar/StepProgressBar";


interface SurveyFormProps {
  currentStep: number;
  direction: number;
  steps: ReactNode[];
}

export default function SurveyForm({
  currentStep,
  direction,
  steps,
}: SurveyFormProps) {

  return (
    <div className={styles.surveyFormContainer}>
      <StepProgressBar currentStep={currentStep}/>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          className={styles.surveyFormWrapper}
          key={currentStep}
          variants={sectionVariants}
          initial={direction === 1 ? "hiddenRight" : "hiddenLeft"}
          animate="visible"
          custom={direction}
        >
          {steps[currentStep]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}