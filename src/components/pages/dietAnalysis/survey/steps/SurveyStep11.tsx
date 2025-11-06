import React from "react";
import { useFormContext, useController } from "react-hook-form";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import SurveyTitle from "@/components/domain/survey/surveyTitle/SurveyTitle";
import Text from "@/components/ui/text/Text";
import SurveyButton from "@/components/domain/survey/surveyButton/SurveyButton";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import { commonWrapper } from "@/styles/common.css";
import { DIET_ANALYSIS_FORM_INFO, SURVEY_TITLES } from "@/constants";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function SurveyStep11({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  // useController로 필드를 최상단에서 가져옵니다.
  const { field: currentMealField } = useController({
    name: "step11.currentMeals",
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
        config={SURVEY_TITLES.step11}
        chipContent="더 정밀한 추천을 위해 3가지만 더 여쭤볼게요 🐶"
      />
      <div
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap: 12,
        })}
      >
        <Text type="label2" color="gray500">
          *복수응답가능
        </Text>
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
