import {
  NONE_VALUE,
  DIET_ANALYSIS_FORM_INFO,
  SURVEY_TITLES,
} from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { useController, useFormContext } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyButton from "@/components/domain/survey/surveyButton/SurveyButton";
import SurveyTitle from "@/components/domain/survey/surveyTitle/SurveyTitle";
import Text from "@/components/ui/text/Text";
import { commonWrapper } from "@/styles/common.css";

interface SurveyStepProps {
  handleChange: () => void;
  handleNextStep: () => void;
  dogName: string;
}

export default function SurveyStep12({
  handleChange,
  handleNextStep,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  // supplements field controller
  const { field: supplementsField } = useController({
    name: "step12.supplements",
    control,
  });

  // useSurveyToggleOption must be at top level
  const { onToggle: onSupplementToggle, isSelected: isSupplementSelected } =
    useSurveyToggleOption<string>({
      selectedValue: supplementsField.value ?? null,
      mode: "checkbox",
      onChange: (value) => {
        supplementsField.onChange(value);
        handleChange();
      },
    });

  const handleToggleAndNext = (value: string) => {
    onSupplementToggle(value);
    if (value === NONE_VALUE) {
      handleNextStep();
    }
  };

  return (
    <>
      <SurveyTitle dogName={dogName} config={SURVEY_TITLES.step12} />

      <Text type="label2" color="gray500">
        *복수응답가능
      </Text>
      <div
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap: 12,
        })}
      >
        {DIET_ANALYSIS_FORM_INFO.dogDietHealth.supplements.options.map(
          (option) => (
            <SurveyButton
              key={option.value}
              label={option.label}
              value={option.value}
              inputType="checkbox"
              isChecked={isSupplementSelected(option.value)}
              onToggle={() => handleToggleAndNext(option.value)}
            />
          )
        )}
      </div>
    </>
  );
}
