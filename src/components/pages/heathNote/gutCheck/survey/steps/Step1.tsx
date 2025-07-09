import { Controller, useFormContext } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import {
  GUT_CHECK_FORM_INFO,
  GUT_CHECK_TITLES,
} from "@/constants/healthNote/gutCheck";
import { GutCheckStepValues } from "@/utils/validation/gutCheckValidation";
import { colSurveyButtonWrapper } from "@/components/pages/survey/steps/StepElements.css";
import SurveyOptionCard from "@/components/common/survey/surveyOptionCard/SurveyOptionCard";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function GutCheckStep1({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<GutCheckStepValues>();

  return (
    <>
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step1} />
      <Controller
        name="step1.bodyFit"
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
              {GUT_CHECK_FORM_INFO.healthStatus.bodyFit.options.map(
                (option) => (
                  <SurveyOptionCard
                    key={option.label}
                    imageSrc={option.imageUrl}
                    label={option.label}
                    value={option.value}
                    imageSize={114}
                    imageWrapperSize={114}
                    subLabel={option.subLabel}
                    isChecked={isSelected(option.value)}
                    onToggle={onToggle}
                  />
                )
              )}
            </div>
          );
        }}
      />
    </>
  );
}
