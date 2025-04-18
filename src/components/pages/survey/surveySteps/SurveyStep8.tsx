import { SURVEY_FORM_INFO, SURVEY_TITLES } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import SurveyTitle from "../surveyTitle/SurveyTitle";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import * as styles from "./SurveySteps.css";
import SurveyButton from "../surveyButton/SurveyButton";

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
      <SurveyTitle petName={petName} config={SURVEY_TITLES.step8} />
      <Controller
        name="step8.activityLevel"
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
              {SURVEY_FORM_INFO.dogLifestyle.activityLevel.options.map(
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
