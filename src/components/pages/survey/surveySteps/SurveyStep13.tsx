
import { SURVEY_FORM_INFO } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller, useFormContext } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import * as styles from "./SurveySteps.css";
import SurveyButton from "../surveyButton/SurveyButton";

interface SurveyStepProps {
  handleChange: () => void;
  handleBlur: (fieldName: string) => Promise<void>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, fieldName: string) => Promise<void>;
  handleNextStep: () => void;
  petName: string;
}

export default function SurveyStep13({
  handleChange,
  handleBlur,
  handleKeyDown,
  handleNextStep,
  petName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  return (
    <Controller
      name="step13.supplement"
      control={control}
      render={({ field }) => {
        const { onToggle, isSelected } = useSurveyToggleOption(
          field.value,
          "checkbox",
          (value) => {
            field.onChange(value);
            handleChange();
          }
        );
        return (
          <div className={styles.colSurveyButtonWrapper}>
            {SURVEY_FORM_INFO.dogDietHealth.currentSupplements.options.map(
              (option) => (
                <SurveyButton
                  key={option.id}
                  label={option.label}
                  value={option.value}
                  isChecked={isSelected(option.value)}
                  inputType="checkbox"
                  onToggle={onToggle}
                />
              )
            )}
          </div>
        );
      }}
    />
  );
}
