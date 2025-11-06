import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { useController, useFormContext } from "react-hook-form";
import { DIET_ANALYSIS_FORM_INFO, SURVEY_TITLES } from "@/constants";
import SurveyButton from "@/components/domain/survey/surveyButton/SurveyButton";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/domain/survey/surveyTitle/SurveyTitle";
import { commonWrapper } from "@/styles/common.css";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function SurveyStep2({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  // oldDog field controller
  const { field: oldDogField } = useController({
    name: "step2.oldDog",
    control,
  });

  // Toggle option for oldDog
  const { onToggle: onOldDogToggle, isSelected: isOldDogSelected } =
    useSurveyToggleOption<boolean>({
      selectedValue: oldDogField.value ?? null,
      mode: "radio",
      onChange: (value) => {
        oldDogField.onChange(value);
        handleChange();
      },
    });

  return (
    <>
      <SurveyTitle dogName={dogName} config={SURVEY_TITLES.step2} />
      <div className={commonWrapper({ align: "start", gap: 8 })}>
        {DIET_ANALYSIS_FORM_INFO.dogBasicInfo.oldDog.options.map((option) => (
          <SurveyButton
            key={String(option.value)}
            label={option.label}
            value={option.value}
            inputType="normal"
            isChecked={isOldDogSelected(option.value)}
            onToggle={() => onOldDogToggle(option.value)}
          />
        ))}
      </div>
    </>
  );
}
