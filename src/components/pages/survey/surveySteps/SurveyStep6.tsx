import { surveyFormInfo, surveyTitles } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import * as styles from "./SurveySteps.css";
import SurveyTitle from "../surveyTitle/SurveyTitle";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";

interface SurveyStepProps {
  handleChange: () => void;
  handleBlur: (fieldName: string) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: string
  ) => Promise<void>;
  petName: string;
}

export default function SurveyStep6({
  handleChange,
  handleBlur,
  handleKeyDown,
  petName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  return (
    <>
      <SurveyTitle petName={petName} config={surveyTitles.step6} />
            <Controller
              name="step6.lactation"
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
                    {surveyFormInfo.dogBasicInfo.lactation.options.map(
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
