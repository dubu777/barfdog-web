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

export default function ProbiomeStep6({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<ProbiomeStepValues>();

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
      <SurveyTitle dogName={dogName} config={PROBIOME_TITLES.step6} />
      <div
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap: 12,
        })}
      >
        {PROBIOME_FORM_INFO.healthStatus.activityLevel.options.map((option) => (
          <SurveyButton
            key={option.value}
            label={option.label}
            value={option.value}
            inputType="radio"
            isChecked={isActivitySelected(option.value)}
            onToggle={() => onActivityToggle(option.value)}
          />
        ))}
      </div>
    </>
  );
}
