import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import { DIET_ANALYSIS_FORM_INFO, SURVEY_TITLES } from "@/constants";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import { commonWrapper } from "@/styles/common.css";
import SurveyOptionCard from "@/components/common/survey/surveyOptionCard/SurveyOptionCard";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function SurveyStep7({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  return (
    <>
      <SurveyTitle dogName={dogName} config={SURVEY_TITLES.step7} />
      <Controller
        name="step7.bodyCondition"
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
            <div
              className={commonWrapper({
                direction: "col",
                align: "start",
                gap: 12,
              })}
            >
              {DIET_ANALYSIS_FORM_INFO.lifestyle.bodyCondition.options.map(
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
