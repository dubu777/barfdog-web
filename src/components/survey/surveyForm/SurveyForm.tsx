"use client";

import { motion, AnimatePresence } from "framer-motion";
import { sectionVariants } from "@/constants/motion";
import * as styles from "./SurveyForm.css";
import { ReactNode } from "react";
import { StepProgressBar } from "../stepProgressBar/StepProgressBar";
import SurveyTextField from "../surveyTextField/SurveyTextField";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";
import { SurveyField, SurveyFormInfo } from "@/types/survey";


interface SurveyFormProps {
  currentStep: number;
  direction: number;
  stepData: SurveyFormInfo;
}

export default function SurveyForm({
  currentStep,
  direction,
  stepData,
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
          {Object.entries(stepData).map(([key, fieldData]) => {
            switch (fieldData.inputType) {
              case "textField":
                return (
                  <SurveyTextField
                    key={key}
                    id={fieldData.id}
                    title={fieldData.title}
                    placeholder={fieldData.placeholder}
                    value={formData[key]}
                    onChange={(value) => handleChange(key as keyof SurveyFormData, value)}
                    onBlur={(e) => handleBlur(e, key as keyof SurveyFormData)}
                    onKeyDown={(e) => handleKeyDown(e, key as keyof SurveyFormData)}
                  />
                );
              case "button":
                return (
                  <SurveyButtonList
                    key={key}
                    options={fieldData.options}
                    title={fieldData.title}
                    selectedValue={formData[key]}
                    isMultiSelect={fieldData.isMultiSelect}
                    onChange={(value) =>
                      handleChange(key as keyof SurveyFormData, value, fieldData.isMultiSelect)
                    }
                  />
                );
              case "selectBox":
                return (
                  <SurveySelectBox
                    key={key}
                    id={fieldData.id}
                    options={fieldData.years || fieldData.options}
                    title={fieldData.title}
                    selectedValue={formData[key]}
                    placeholder={fieldData.placeholder}
                    onSelect={(value) => handleChange(key as keyof SurveyFormData, value)}
                  />
                ); 
              default:
                return null;
            }
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}