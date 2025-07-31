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

export default function GutCheckStep8({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<GutCheckStepValues>();

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
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step8} />
      <div
        className={commonWrapper({ direction: "col", align: "start", gap: 12 })}
      >
        {GUT_CHECK_FORM_INFO.lifestyle.feedType.options.map((option) => (
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
