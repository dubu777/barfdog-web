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

export default function ProbiomeStep8({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<ProbiomeStepValues>();

  const { field: feedField } = useController({
    name: "step8.feedType",
    control,
  });

  const { onToggle: onFeedToggle, isSelected: isFeedSelected } =
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
      <SurveyTitle dogName={dogName} config={PROBIOME_TITLES.step8} />
      <div
        className={commonWrapper({ direction: "col", align: "start", gap: 12 })}
      >
        {PROBIOME_FORM_INFO.lifestyle.feedType.options.map((option) => (
          <SurveyButton
            key={option.value}
            label={option.label}
            value={option.value}
            inputType="radio"
            isChecked={isFeedSelected(option.value)}
            onToggle={() => onFeedToggle(option.value)}
          />
        ))}
      </div>
    </>
  );
}
