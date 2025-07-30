import { DIET_ANALYSIS_FORM_INFO, SURVEY_TITLES } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, Path, useFormContext } from "react-hook-form";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import * as styles from "./StepElements.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import { commonWrapper } from "@/styles/common.css";

interface SurveyStepProps {
  handleChange: () => void;
  handleBlur: (fieldName: Path<SurveyStepValues>) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: Path<SurveyStepValues>
  ) => Promise<void>;
  handleNextStep: () => void;
  dogName: string;
}

export default function SurveyStep12({
  handleChange,
  handleBlur,
  handleKeyDown,
  handleNextStep,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  return (
    <>
      <SurveyTitle
        dogName={dogName}
        config={SURVEY_TITLES.step12}
        chipContent="더 정밀한 추천을 위해 3가지만 더 여쭤볼게요 🐶"
      />
      <Controller
        name="step12.currentMeal"
        control={control}
        render={({ field }) => {
          const { onToggle, isSelected } = useSurveyToggleOption({
            selectedValue: field.value,
            mode: "checkbox",
            onChange: (value) => {
              field.onChange(value);
              handleChange();
            },
          });
          return (
            <div
              className={commonWrapper({
                direction: "col",
                align: "start",
                gap: 12,
              })}
            >
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
