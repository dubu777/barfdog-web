import {
  NONE_VALUE,
  DIET_ANALYSIS_FORM_INFO,
  SURVEY_TITLES,
} from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller, Path, useFormContext } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import * as styles from "./StepElements.css";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";

interface SurveyStepProps {
  handleChange: () => void;
  handleNextStep: () => void;
  dogName: string;
}

export default function SurveyStep13({
  handleChange,
  handleNextStep,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  return (
    <>
      <SurveyTitle dogName={dogName} config={SURVEY_TITLES.step13} />

      <Controller
        name="step13.supplements"
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

          const handleToggleAndNext = (value: string) => {
            onToggle(value);
            if (value === NONE_VALUE) {
              handleNextStep();
            }
          };
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
