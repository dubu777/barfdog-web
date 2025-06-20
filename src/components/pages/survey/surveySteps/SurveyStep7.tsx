import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import SurveyTitle from "../surveyTitle/SurveyTitle";
import { DIET_ANALYSIS_FORM_INFO, surveyTitles } from "@/constants";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import * as styles from "./SurveySteps.css";
import DogImageButton from "../dogImageButton/DogImageButton";

interface SurveyStepProps {
  handleChange: () => void;
  petName: string;
}

export default function SurveyStep7({
  handleChange,
  petName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  return (
    <>
      <SurveyTitle petName={petName} config={surveyTitles.step7} />
      <Controller
        name="step7.dogBodyCondition"
        control={control}
        render={({ field }) => {
          const { onToggle, isSelected } = useSurveyToggleOption({
            selectedValue: field.value,
            mode: "radio",
            onChange: (value) => {
              field.onChange(value);
              handleChange();
            },
          });
          return (
            <div className={styles.colSurveyButtonWrapper}>
              {DIET_ANALYSIS_FORM_INFO.dogLifestyle.dogBodyCondition.options.map(
                (option) => (
                  <DogImageButton
                    key={option.label}
                    imageSrc={option.imageUrl}
                    label={option.label}
                    value={option.value}
                    subLabel={option.subLabel}
                    isChecked={isSelected(option.value)}
                    onToggle={onToggle}
                  />
                )
              )}
            </div>
          );
        }}
      />
    </>
  );
}
