import {
  NONE_VALUE,
  DIET_ANALYSIS_FORM_INFO,
  SURVEY_TITLES,
} from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { useController, useFormContext } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import SurveyButtonGroup from "../../../../common/survey/surveyButtonGroup/SurveyButtonGroup";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";

interface SurveyStepProps {
  dogName: string;
  handleChange: () => void;
}

export default function SurveyStep1({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control, setValue } = useFormContext<SurveyStepValues>();
  const { field: neutralField } = useController({
    name: "step1.neutralization",
    control,
  });

  const { onToggle: onNeutralToggle, isSelected: isNeutralSelected } =
    useSurveyToggleOption<boolean>({
      selectedValue: neutralField.value ?? null,
      mode: "radio",
      onChange: (value) => {
        neutralField.onChange(value);
        handleChange();
        if (value === true) {
          setValue("step4.pregnancy", NONE_VALUE, {
            shouldValidate: false,
            shouldDirty: true,
          });
          setValue("step5.lactation", NONE_VALUE, {
            shouldValidate: false,
            shouldDirty: true,
          });
        }
      },
    });

  return (
    <>
      <SurveyTitle dogName={dogName} config={SURVEY_TITLES.step1} />

      <SurveyButtonGroup>
        {DIET_ANALYSIS_FORM_INFO.dogBasicInfo.neutralization.options.map(
          (option) => (
            <SurveyButton
              key={String(option.value)}
              label={option.label}
              value={option.value}
              inputType="normal"
              isChecked={isNeutralSelected(option.value)}
              onToggle={() => onNeutralToggle(option.value)}
            />
          )
        )}
      </SurveyButtonGroup>
    </>
  );
}
