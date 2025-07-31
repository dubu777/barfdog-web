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

export default function GutCheckStep6({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<GutCheckStepValues>();

  // activityLevel field controller
  const { field: activityField } = useController({
    name: "step6.activityLevel",
    control,
  });

  const { onToggle: onActivityToggle, isSelected: isActivitySelected } =
    useSurveyToggleOption<string>({
      selectedValue: activityField.value ?? null,
      mode: "radio",
      onChange: (value) => {
        activityField.onChange(value);
        handleChange();
      },
    });

  return (
    <>
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step6} />
      <div
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap: 12,
        })}
      >
        {GUT_CHECK_FORM_INFO.healthStatus.activityLevel.options.map(
          (option) => (
            <SurveyButton
              key={option.value}
              label={option.label}
              value={option.value}
              inputType="radio"
              isChecked={isActivitySelected(option.value)}
              onToggle={() => onActivityToggle(option.value)}
            />
          )
        )}
      </div>
    </>
  );
}
