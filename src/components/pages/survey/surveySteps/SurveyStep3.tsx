import { DIET_ANALYSIS_FORM_INFO, surveyTitles } from "@/constants";
import * as styles from "./SurveySteps.css";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, Path, useFormContext } from "react-hook-form";
import ImageButton from "../imageButton/ImageButton";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "../surveyTitle/SurveyTitle";
import SurveyButtonGroup from "../surveyButtonGroup/SurveyButtonGroup";
import InputField from "@/components/common/inputField/InputField";

interface SurveyStepProps {
  petName: string;
  handleBlur: (fieldName: Path<SurveyStepValues>) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: Path<SurveyStepValues>
  ) => Promise<void>;
}

export default function SurveyStep3({
  petName,
  handleBlur,
  handleKeyDown,
}: SurveyStepProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<SurveyStepValues>();

  return (
    <>
      <SurveyTitle petName={petName} config={surveyTitles.step3} />
      <Controller
        name="step3.dogSize"
        control={control}
        render={({ field }) => {
          const { onToggle, isSelected } = useSurveyToggleOption({
            selectedValue: field.value,
            mode: "radio",
            onChange: (value) => {
              field.onChange(value);
            },
          });
          return (
            <SurveyButtonGroup title="견사이즈">
              {DIET_ANALYSIS_FORM_INFO.dogBasicInfo.dogSize.options.map(
                (option) => (
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
                )
              )}
            </SurveyButtonGroup>
          );
        }}
      />
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
                console.log("field.name", field.name);
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
