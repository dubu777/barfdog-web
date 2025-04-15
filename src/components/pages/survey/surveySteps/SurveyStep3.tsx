import { SURVEY_FORM_INFO, SURVEY_TITLES } from "@/constants";
import * as styles from "./SurveySteps.css";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller } from "react-hook-form";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ImageButton from "../imageButton/ImageButton";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "../surveyTitle/SurveyTitle";

interface SurveyStepProps {
  handleChange: () => void;
  control: Control<SurveyStepValues>;
  petName: string;
}

export default function SurveyStep3({
  handleChange,
  control,
  petName,
}: SurveyStepProps) {
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
            <div className={styles.rowSurveyButtonWrapper}>
              {SURVEY_FORM_INFO.dogBasicInfo.dogSize.options.map((option) => (
                <ImageButton
                  key={option.id}
                  label={option.label}
                  value={option.value}
                  inputType="radio"
                  imageSrc={option.imageUrl}
                  imageWidth={80}
                  imageHeight={80}
                  isChecked={isSelected(option.value)}
                  onToggle={onToggle}
                />
              ))}
            </div>
          );
        }}
      />
    </div>
  );
}
