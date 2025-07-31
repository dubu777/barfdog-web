import { useFormContext, useController } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import {
  GUT_CHECK_FORM_INFO,
  GUT_CHECK_TITLES,
} from "@/constants/healthNote/gutCheck";
import { GutCheckStepValues } from "@/utils/validation/gutCheckValidation";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import { NONE_VALUE } from "@/constants";
import SurveyButtonGroup from "@/components/common/survey/surveyButtonGroup/SurveyButtonGroup";

interface SurveyStepProps {
  handleChange: () => void;
  handleNextStep: () => void;
  dogName: string;
}

export default function GutCheckStep13({
  handleChange,
  handleNextStep,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<GutCheckStepValues>();
  const { field: cohabitingPetListField } = useController({
    name: "step13.cohabitingPetList",
    control,
  });

  const { onToggle, isSelected } = useSurveyToggleOption({
    selectedValue: cohabitingPetListField.value,
    mode: "checkbox",
    onChange: (value) => {
      cohabitingPetListField.onChange(value);
      handleChange();
      if (Array.isArray(value) && value.includes(NONE_VALUE)) {
        handleNextStep();
      }
    },
  });

  return (
    <>
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step13} />
      <SurveyButtonGroup isMultiple direction="col">
        {GUT_CHECK_FORM_INFO.lifestyle.cohabitingPetList.options.map(
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
      </SurveyButtonGroup>
    </>
  );
}
