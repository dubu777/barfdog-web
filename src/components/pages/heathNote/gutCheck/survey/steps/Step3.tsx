import { Controller, useFormContext } from "react-hook-form";
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

export default function GutCheckStep3({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<GutCheckStepValues>();

  return (
    <>
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step3} />
      <Controller
        name="step3.antibioticsStatus"
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
              {GUT_CHECK_FORM_INFO.healthStatus.antibioticsStatus.options.map(
                (option) => (
                  <SurveyButton
                    key={option.label}
                    label={option.label}
                    value={option.value}
                    inputType="radio"
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
