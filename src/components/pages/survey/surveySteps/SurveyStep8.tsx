import { DIET_ANALYSIS_FORM_INFO, surveyTitles } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import SurveyTitle from "../surveyTitle/SurveyTitle";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import * as styles from "./SurveySteps.css";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";

interface SurveyStepProps {
  handleChange: () => void;
  petName: string;
}

export default function SurveyStep8({
  handleChange,
  petName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  return (
    <>
      <SurveyTitle petName={petName} config={surveyTitles.step8} />
      <Controller
        name="step8.activityLevel"
        control={control}
        render={({ field }) => {
          const { onToggle, isSelected } = useSurveyToggleOption({
            selectedValue: field.value,
            mode: "radio",
            onChange: (value) => {
              field.onChange(value);
              handleChange();
            },
          });
          return (
            <div className={styles.colSurveyButtonWrapper}>
              {DIET_ANALYSIS_FORM_INFO.dogLifestyle.activityLevel.options.map(
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
