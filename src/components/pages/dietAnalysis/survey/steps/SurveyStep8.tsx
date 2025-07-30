import { DIET_ANALYSIS_FORM_INFO, SURVEY_TITLES } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import * as styles from "./StepElements.css";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import { commonWrapper } from "@/styles/common.css";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function SurveyStep8({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  return (
    <>
      <SurveyTitle dogName={dogName} config={SURVEY_TITLES.step8} />
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
            <div
              className={commonWrapper({
                direction: "col",
                align: "start",
                gap: 12,
              })}
            >
              {DIET_ANALYSIS_FORM_INFO.lifestyle.activityLevel.options.map(
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
