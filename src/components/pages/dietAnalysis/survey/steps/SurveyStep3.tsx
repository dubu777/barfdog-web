import { DIET_ANALYSIS_FORM_INFO, SURVEY_TITLES } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import {
  Controller,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import ImageButton from "../imageButton/ImageButton";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyButtonGroup from "../../../../common/survey/surveyButtonGroup/SurveyButtonGroup";
import InputField from "@/components/common/inputField/InputField";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";

interface SurveyStepProps {
  dogName: string;
  handleBlur: (fieldName: Path<SurveyStepValues>) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: Path<SurveyStepValues>
  ) => Promise<void>;
}

export default function SurveyStep3({
  dogName,
  handleBlur,
  handleKeyDown,
}: SurveyStepProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<SurveyStepValues>();

  const { field: dogSizeField } = useController({
    name: "step3.dogSize",
    control,
  });

  const { onToggle, isSelected } = useSurveyToggleOption({
    selectedValue: dogSizeField.value,
    mode: "radio",
    onChange: (value) => dogSizeField.onChange(value),
  });

  return (
    <>
      <SurveyTitle dogName={dogName} config={SURVEY_TITLES.step3} />

      <SurveyButtonGroup title="견사이즈">
        {DIET_ANALYSIS_FORM_INFO.dogBasicInfo.dogSize.options.map((option) => (
          <ImageButton
            key={option.label}
            label={option.label}
            value={option.value}
            inputType="radio"
            imageSrc={option.imageUrl}
            imageWidth={70}
            imageHeight={70}
            isChecked={isSelected(option.value)}
            onToggle={onToggle}
          />
        ))}
      </SurveyButtonGroup>

      <SurveyButtonGroup title="몸무게" error={errors.step3?.weight?.message}>
        <Controller
          name="step3.weight"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              unit="kg"
              placeholder="몸무게 입력"
              onChange={(e) => {
                field.onChange(e);
              }}
              onKeyDown={(e) => handleKeyDown(e, field.name)}
              onBlur={() => handleBlur(field.name)}
            />
          )}
        />
      </SurveyButtonGroup>
    </>
  );
}
