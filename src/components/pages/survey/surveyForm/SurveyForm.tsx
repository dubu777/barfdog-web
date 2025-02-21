"use client";

import { motion, AnimatePresence } from "framer-motion";
import { sectionVariants } from "@/constants/motion";
import * as styles from "./SurveyForm.css";
import { ReactNode } from "react";

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
    <section className={styles.surveyFormContainer}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          className={styles.surveyFormWrapper}
          key={currentStep}
          variants={sectionVariants}
          initial={direction === 1 ? "hiddenRight" : "hiddenLeft"}
          animate="visible"
          custom={direction}
        >
          {steps[currentStep - 1]}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
