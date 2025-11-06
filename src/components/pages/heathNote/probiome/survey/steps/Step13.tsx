import { useFormContext, useController } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/domain/survey/surveyTitle/SurveyTitle";
import {
  PROBIOME_FORM_INFO,
  PROBIOME_TITLES,
} from "@/constants/healthNote/probiome";
import { ProbiomeStepValues } from "@/utils/validation/probiomeValidation";
import SurveyButton from "@/components/domain/survey/surveyButton/SurveyButton";
import { NONE_VALUE } from "@/constants";
import SurveyButtonGroup from "@/components/domain/survey/surveyButtonGroup/SurveyButtonGroup";

interface SurveyStepProps {
  handleChange: () => void;
  handleNextStep: () => void;
  dogName: string;
}

export default function ProbiomeStep13({
  handleChange,
  handleNextStep,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<ProbiomeStepValues>();
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
      <SurveyTitle dogName={dogName} config={PROBIOME_TITLES.step13} />
      <SurveyButtonGroup isMultiple direction="col">
        {PROBIOME_FORM_INFO.lifestyle.cohabitingPetList.options.map(
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
