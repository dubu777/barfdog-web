import {
  NONE_VALUE,
  DIET_ANALYSIS_FORM_INFO,
  SURVEY_TITLES,
} from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import SurveyTitle from "../../../common/survey/surveyTitle/SurveyTitle";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyGridButtonGroup from "../surveyGridButtonGroup/SurveyGridButtonGroup";
import ImageButton from "../imageButton/ImageButton";

interface SurveyStepProps {
  handleChange: () => void;
  handleNextStep: () => void;
  dogName: string;
}

export default function SurveyStep14({
  handleChange,
  handleNextStep,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  return (
    <>
      <SurveyTitle
        dogName={dogName}
        config={SURVEY_TITLES.step14}
        chipContent="마지막 질문이에요! 🎉"
        chipColor="red"
      />
      <Controller
        name="step14.healthIssues"
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
            <SurveyGridButtonGroup>
              {DIET_ANALYSIS_FORM_INFO.dogDietHealth.healthIssues.options.map(
                (option) => (
                  <ImageButton
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    inputType="checkbox"
                    defaultSvg={option.Icon}
                    selectedSvg={option.SelectedIcon}
                    isChecked={isSelected(option.value)}
                    onToggle={handleToggleAndNext}
                    display="grid2"
                  />
                )
              )}
            </SurveyGridButtonGroup>
          );
        }}
      />
    </>
  );
}
