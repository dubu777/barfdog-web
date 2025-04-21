"use client";

import * as styles from "./SurveySteps.css";
import { SURVEY_FORM_INFO, SURVEY_TITLES } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import SurveyTitle from "../surveyTitle/SurveyTitle";
import SurveyButton from "../surveyButton/SurveyButton";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";

interface SurveyStepProps {
  handleChange: () => void;
  petName: string;
}

export default function SurveyStep5({
  handleChange,
  petName,
}: SurveyStepProps) {

  const { control } = useFormContext<SurveyStepValues>();


  return (
    <>
      <SurveyTitle petName={petName} config={SURVEY_TITLES.step5} />
            <Controller
              name="step5.pregnancy"
              control={control}
              render={({ field }) => {
                const { onToggle, isSelected } = useSurveyToggleOption(
                  field.value,
                  "radio",
                  (value) => {
                    field.onChange(value);
                    handleChange();
                  }
                );
                return (
                  <div className={styles.colSurveyButtonWrapper}>
                    {SURVEY_FORM_INFO.dogBasicInfo.pregnancy.options.map(
                      (option) => (
                        <SurveyButton
                          key={option.label}
                          label={option.label}
                          value={option.value}
                          inputType="radio"
                          isChecked={isSelected(option.value)}
                          onToggle={onToggle}
                        />
                      )
                    )}
                  </div>
                );
              }}
            />
    </>
  );
}