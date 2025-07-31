import { useFormContext, useController } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import {
  GUT_CHECK_FORM_INFO,
  GUT_CHECK_TITLES,
} from "@/constants/healthNote/gutCheck";
import { GutCheckStepValues } from "@/utils/validation/gutCheckValidation";
import SurveyGridButtonGroup from "@/components/common/survey/surveyGridButtonGroup/SurveyGridButtonGroup";
import ImageButton from "@/components/pages/dietAnalysis/survey/imageButton/ImageButton";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function GutCheckStep15({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<GutCheckStepValues>();
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
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step15} />
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
    </>
  );
}
