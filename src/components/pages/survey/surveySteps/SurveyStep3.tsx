import { SURVEY_FORM_INFO, SURVEY_TITLES } from "@/constants";
import * as styles from "./SurveySteps.css";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import ImageButton from "../imageButton/ImageButton";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "../surveyTitle/SurveyTitle";
import SurveyButtonGroup from "../surveyButtonGroup/SurveyButtonGroup";
import InputField from "@/components/common/inputField/InputField";

interface SurveyStepProps {
  handleChange: () => void;
  petName: string;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: string
  ) => Promise<void>;
}

export default function SurveyStep3({
  handleChange,
  petName,
  handleKeyDown,
}: SurveyStepProps) {
  const { control, formState: {errors}, setValue } = useFormContext<SurveyStepValues>();

  return (
    <div className={styles.surveyStepContainer}>
      <SurveyTitle petName={petName} titleTemplates={SURVEY_TITLES.step3} />
      <Controller
        name="step3.dogSize"
        control={control}
        render={({ field }) => {
          const { onToggle, isSelected } = useSurveyToggleOption(
            field.value,
            "radio",
            (value) => {
              field.onChange(value);
            }
          );
          return (
            <SurveyButtonGroup title="견사이즈">
              {SURVEY_FORM_INFO.dogBasicInfo.dogSize.options.map((option) => (
                <ImageButton
                  key={option.id}
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
              }}
              onKeyDown={(e) => handleKeyDown(e, field.name)}
            />
          )}
        />
      </SurveyButtonGroup>
    </div>
  );
}
