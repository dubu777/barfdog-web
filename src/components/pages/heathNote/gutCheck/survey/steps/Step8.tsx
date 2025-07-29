import { Controller, useFormContext } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import {
  GUT_CHECK_FORM_INFO,
  GUT_CHECK_TITLES,
} from "@/constants/healthNote/gutCheck";
import { GutCheckStepValues } from "@/utils/validation/gutCheckValidation";
import { colSurveyButtonWrapper } from "@/components/pages/survey/steps/StepElements.css";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function GutCheckStep8({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<GutCheckStepValues>();

  return (
    <>
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step8} />
      <Controller
        name="step8.feedType"
        control={control}
        render={({ field }) => {
          const { onToggle, isSelected } = useSurveyToggleOption({
            selectedValue: field.value,
            mode: "radio",
            onChange: (value) => {
              field.onChange(value);
              handleChange();
            },
          });
          return (
            <div className={colSurveyButtonWrapper}>
              {GUT_CHECK_FORM_INFO.lifestyle.feedType.options.map((option) => (
                <SurveyButton
                  key={option.label}
                  label={option.label}
                  value={option.value}
                  inputType="radio"
                  isChecked={isSelected(option.value)}
                  onToggle={onToggle}
                />
              ))}
            </div>
          );
        }}
      />
    </>
  );
}
