import { NONE_VALUE, DIET_ANALYSIS_FORM_INFO, surveyTitles } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller, useFormContext } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import * as styles from "./SurveySteps.css";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import SurveyTitle from "../surveyTitle/SurveyTitle";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface SurveyStepProps {
  handleChange: () => void;
  handleBlur: (fieldName: string) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: string
  ) => Promise<void>;
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
    <>
      <SurveyTitle petName={petName} config={surveyTitles.step13} />

      <Controller
        name="step13.supplements"
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

          const handleToggleAndNext = (value: string) => {
            onToggle(value);
            if (value === NONE_VALUE) {
              handleNextStep();
            }
          };
          return (
            <div className={styles.colSurveyButtonWrapper}>
              <DefaultText type="label2" color="gray500">
                *복수응답가능
              </DefaultText>
              {DIET_ANALYSIS_FORM_INFO.dogDietHealth.supplements.options.map(
                (option) => (
                  <SurveyButton
                    key={option.label}
                    label={option.label}
                    value={option.value}
                    isChecked={isSelected(option.value)}
                    inputType="checkbox"
                    onToggle={handleToggleAndNext}
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
