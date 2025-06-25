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
import SurveyButtonGroup from "@/components/pages/survey/surveyButtonGroup/SurveyButtonGroup";
import { NONE_VALUE } from "@/constants";

interface SurveyStepProps {
  handleChange: () => void;
  handleNextStep: () => void;
  dogName: string;
}

export default function GutCheckStep14({
  handleChange,
  handleNextStep,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<GutCheckStepValues>();

  return (
    <>
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step14} />
      <Controller
        name="step14.cohabitantPets"
        control={control}
        render={({ field }) => {
          const { onToggle, isSelected } = useSurveyToggleOption({
            selectedValue: field.value,
            mode: "checkbox",
            onChange: (value) => {
              field.onChange(value);
              handleChange();
              if (Array.isArray(value) && value.includes(NONE_VALUE)) {
                handleNextStep();
              }
            },
          });
          return (
            <SurveyButtonGroup isMultiple direction="col">
              {GUT_CHECK_FORM_INFO.dogLifestyle.cohabitantPets.options.map(
                (option) => (
                  <SurveyButton
                    key={option.label}
                    label={option.label}
                    value={option.value}
                    inputType="checkbox"
                    isChecked={isSelected(option.value)}
                    onToggle={onToggle}
                  />
                )
              )}
            </SurveyButtonGroup>
          );
        }}
      />
    </>
  );
}
