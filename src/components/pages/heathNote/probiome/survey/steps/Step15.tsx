import { useFormContext, useController } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import {
  PROBIOME_FORM_INFO,
  PROBIOME_TITLES,
} from "@/constants/healthNote/probiome";
import { ProbiomeStepValues } from "@/utils/validation/probiomeValidation";
import SurveyGridButtonGroup from "@/components/common/survey/surveyGridButtonGroup/SurveyGridButtonGroup";
import ImageButton from "@/components/pages/dietAnalysis/survey/imageButton/ImageButton";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function ProbiomeStep15({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<ProbiomeStepValues>();
  const { field: healthConcernTypeListField } = useController({
    name: "step15.healthConcernTypeList",
    control,
  });

  const { onToggle, isSelected } = useSurveyToggleOption({
    selectedValue: healthConcernTypeListField.value,
    mode: "checkbox",
    onChange: (value) => {
      healthConcernTypeListField.onChange(value);
      handleChange();
    },
  });

  return (
    <>
      <SurveyTitle dogName={dogName} config={PROBIOME_TITLES.step15} />
      <SurveyGridButtonGroup>
        {PROBIOME_FORM_INFO.additionalInfo.healthConcernTypeList.options.map(
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
    </>
  );
}
