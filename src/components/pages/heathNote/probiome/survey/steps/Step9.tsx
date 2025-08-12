import { useController, useFormContext } from "react-hook-form";
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

export default function ProbiomeStep9({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<ProbiomeStepValues>();

  const { field: feedField } = useController({
    name: "step9.foodType",
    control,
  });

  const { onToggle: onFoodToggle, isSelected: isFoodSelected } =
    useSurveyToggleOption<string>({
      selectedValue: feedField.value ?? null,
      mode: "radio",
      onChange: (value) => {
        feedField.onChange(value);
        handleChange();
      },
    });

  return (
    <>
      <SurveyTitle dogName={dogName} config={PROBIOME_TITLES.step9} />
      <div
        className={commonWrapper({ direction: "col", align: "start", gap: 12 })}
      >
        {PROBIOME_FORM_INFO.lifestyle.foodType.options.map((option) => (
          <SurveyButton
            key={option.value}
            label={option.label}
            value={option.value}
            inputType="radio"
            isChecked={isFoodSelected(option.value)}
            onToggle={() => onFoodToggle(option.value)}
          />
        ))}
      </div>
    </>
  );
}
