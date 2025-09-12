import React from "react";
import { useFormContext, useController } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import {
  PROBIOME_FORM_INFO,
  PROBIOME_TITLES,
} from "@/constants/healthNote/probiome";
import { ProbiomeStepValues } from "@/utils/validation/probiomeValidation";
import SurveyOptionCard from "@/components/common/survey/surveyOptionCard/SurveyOptionCard";
import { commonWrapper } from "@/styles/common.css";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function ProbiomeStep1({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<ProbiomeStepValues>();
  const { field: bodyFitField } = useController({
    name: "step1.bodyFit",
    control,
  });

  const { onToggle, isSelected } = useSurveyToggleOption({
    selectedValue: bodyFitField.value,
    mode: "radio",
    onChange: (value) => {
      bodyFitField.onChange(value);
      handleChange();
    },
  });

  return (
    <>
      <SurveyTitle dogName={dogName} config={PROBIOME_TITLES.step1} />
      <div
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap: 12,
          paddingBottom: 85,
        })}
      >
        {PROBIOME_FORM_INFO.healthStatus.bodyFit.options.map((option) => (
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
        ))}
      </div>
    </>
  );
}
