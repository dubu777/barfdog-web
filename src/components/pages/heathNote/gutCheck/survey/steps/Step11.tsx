import { useFormContext, useController } from "react-hook-form";
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

export default function GutCheckStep11({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<GutCheckStepValues>();

  const { field: defecationHabitField } = useController({
    name: "step11.defecationHabit",
    control,
  });

  const { onToggle, isSelected } = useSurveyToggleOption({
    selectedValue: defecationHabitField.value,
    mode: "radio",
    onChange: (value) => {
      defecationHabitField.onChange(value);
      handleChange();
    },
  });

  return (
    <>
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step11} />
      <div
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap: 12,
        })}
      >
        {GUT_CHECK_FORM_INFO.lifestyle.defecationHabit.options.map(
          (option) => (
            <SurveyButton
              key={option.label}
              label={option.label}
              subLabel={option.subLabel}
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
