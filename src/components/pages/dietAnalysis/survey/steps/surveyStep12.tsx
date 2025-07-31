import React from "react";
import { useFormContext, useController } from "react-hook-form";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import { commonWrapper } from "@/styles/common.css";
import { DIET_ANALYSIS_FORM_INFO, SURVEY_TITLES } from "@/constants";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function SurveyStep12({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  // useController로 필드를 최상단에서 가져옵니다.
  const { field: currentMealField } = useController({
    name: "step12.currentMeals",
    control,
  });

  // useSurveyToggleOption 훅도 최상단에서 호출합니다.
  const { onToggle, isSelected } = useSurveyToggleOption({
    selectedValue: currentMealField.value,
    mode: "checkbox",
    onChange: (value) => {
      currentMealField.onChange(value);
      handleChange();
    },
  });

  return (
    <>
      <SurveyTitle
        dogName={dogName}
        config={SURVEY_TITLES.step12}
        chipContent="더 정밀한 추천을 위해 3가지만 더 여쭤볼게요 🐶"
      />
      <div
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap: 12,
        })}
      >
        <DefaultText type="label2" color="gray500">
          *복수응답가능
        </DefaultText>
        {DIET_ANALYSIS_FORM_INFO.dogDietHealth.currentMeals.options.map(
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
      </div>
    </>
  );
}
