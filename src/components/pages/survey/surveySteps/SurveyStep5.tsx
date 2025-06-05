"use client";

import * as styles from "./SurveySteps.css";
import { surveyFormInfo, surveyTitles } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import SurveyTitle from "../surveyTitle/SurveyTitle";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
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
      <SurveyTitle petName={petName} config={surveyTitles.step5} />
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
                    {surveyFormInfo.dogBasicInfo.pregnancy.options.map(
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