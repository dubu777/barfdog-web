import { useFormContext, useController } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import {
  PROBIOME_FORM_INFO,
  PROBIOME_TITLES,
} from "@/constants/healthNote/probiome";
import { ProbiomeStepValues } from "@/utils/validation/probiomeValidation";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import { commonWrapper } from "@/styles/common.css";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function ProbiomeStep12({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<ProbiomeStepValues>();
  const { field: snackLevelField } = useController({
    name: "step12.snackLevel",
    control,
  });

  const { onToggle, isSelected } = useSurveyToggleOption({
    selectedValue: snackLevelField.value,
    mode: "radio",
    onChange: (value) => {
      snackLevelField.onChange(value);
      handleChange();
    },
  });

  return (
    <>
      <SurveyTitle dogName={dogName} config={PROBIOME_TITLES.step12} />
      <div
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap: 12,
        })}
      >
        {PROBIOME_FORM_INFO.lifestyle.snackLevel.options.map((option) => (
          <SurveyButton
            key={option.label}
            label={option.label}
            subLabel={option.subLabel}
            value={option.value}
            inputType="radio"
            isChecked={isSelected(option.value)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </>
  );
}
