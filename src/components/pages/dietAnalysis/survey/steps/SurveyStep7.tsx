import { DIET_ANALYSIS_FORM_INFO, SURVEY_TITLES } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { useController, useFormContext } from "react-hook-form";
import SurveyTitle from "@/components/domain/survey/surveyTitle/SurveyTitle";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyButton from "@/components/domain/survey/surveyButton/SurveyButton";
import { commonWrapper } from "@/styles/common.css";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function SurveyStep7({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  const { field: activityLevelField } = useController({
    name: "step7.activityLevel",
    control,
  });

  const { onToggle, isSelected } = useSurveyToggleOption({
    selectedValue: activityLevelField.value,
    mode: "radio",
    onChange: (value) => {
      activityLevelField.onChange(value);
      handleChange();
    },
  });

  return (
    <>
      <SurveyTitle dogName={dogName} config={SURVEY_TITLES.step7} />
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
    </>
  );
}
