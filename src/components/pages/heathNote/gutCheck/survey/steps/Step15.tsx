import { Controller, useFormContext } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import {
  GUT_CHECK_FORM_INFO,
  GUT_CHECK_TITLES,
} from "@/constants/healthNote/gutCheck";
import { GutCheckStepValues } from "@/utils/validation/gutCheckValidation";
import SurveyButtonGroup from "@/components/pages/survey/surveyButtonGroup/SurveyButtonGroup";
import Chips from "@/components/common/chips/Chips";
import SurveyGridButtonGroup from "@/components/pages/survey/surveyGridButtonGroup/SurveyGridButtonGroup";
import ImageButton from "@/components/pages/survey/imageButton/ImageButton";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function GutCheckStep15({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<GutCheckStepValues>();
  return (
    <>
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step15} />

      <Controller
        name="step15.healthConcernTypeList"
        control={control}
        render={({ field }) => {
          const { onToggle, isSelected } = useSurveyToggleOption({
            selectedValue: field.value,
            mode: "checkbox",
            onChange: (value) => {
              field.onChange(value);
              handleChange();
            },
          });
          return (
            <SurveyGridButtonGroup>
              {GUT_CHECK_FORM_INFO.additionalInfo.healthConcernTypeList.options.map(
                (option) => (
                  <ImageButton
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    inputType="checkbox"
                    defaultSvg={option.Icon}
                    selectedSvg={option.SelectedIcon}
                    isChecked={isSelected(option.value)}
                    onToggle={onToggle}
                    display="grid1"
                  />
                )
              )}
            </SurveyGridButtonGroup>
          );
        }}
      />
    </>
  );
}
