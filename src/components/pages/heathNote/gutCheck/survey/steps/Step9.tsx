import { useController, useFormContext } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import {
  GUT_CHECK_FORM_INFO,
  GUT_CHECK_TITLES,
} from "@/constants/healthNote/gutCheck";
import { GutCheckStepValues } from "@/utils/validation/gutCheckValidation";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import { commonWrapper } from "@/styles/common.css";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function GutCheckStep9({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<GutCheckStepValues>();

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
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step9} />
      <div
        className={commonWrapper({ direction: "col", align: "start", gap: 12 })}
      >
        {GUT_CHECK_FORM_INFO.lifestyle.foodType.options.map((option) => (
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
