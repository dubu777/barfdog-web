import { DIET_ANALYSIS_FORM_INFO, SURVEY_TITLES } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { useController, useFormContext } from "react-hook-form";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import { commonWrapper } from "@/styles/common.css";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function SurveyStep5({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  const { field: lactationField } = useController({
    name: "step5.lactation",
    control,
  });

  const { onToggle, isSelected } = useSurveyToggleOption({
    selectedValue: lactationField.value,
    mode: "radio",
    onChange: (value) => {
      lactationField.onChange(value);
      handleChange();
    },
  });

  return (
    <>
      <SurveyTitle dogName={dogName} config={SURVEY_TITLES.step5} />
      <div
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap: 12,
        })}
      >
        {DIET_ANALYSIS_FORM_INFO.dogBasicInfo.lactation.options.map(
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
