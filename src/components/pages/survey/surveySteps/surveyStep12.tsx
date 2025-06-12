import { DIET_ANALYSIS_FORM_INFO, surveyTitles } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import SurveyTitle from "../surveyTitle/SurveyTitle";
import * as styles from "./SurveySteps.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";

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

export default function SurveyStep12({
  handleChange,
  handleBlur,
  handleKeyDown,
  handleNextStep,
  petName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  return (
    <>
      <SurveyTitle
        petName={petName}
        config={surveyTitles.step12}
        chipContent="더 정밀한 추천을 위해 3가지만 더 여쭤볼게요 🐶"
      />
      <Controller
        name="step12.currentMeal"
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
              <DefaultText type="label2" color="gray500">
                *복수응답가능
              </DefaultText>
              {DIET_ANALYSIS_FORM_INFO.dogDietHealth.currentMeal.options.map(
                (option) => (
                  <SurveyButton
                    key={option.label}
                    label={option.label}
                    value={option.value}
                    inputType="checkbox"
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
