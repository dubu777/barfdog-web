
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import SurveyTitle from "../surveyTitle/SurveyTitle";
import { SURVEY_FORM_INFO, SURVEY_TITLES } from "@/constants";
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
      <SurveyTitle petName={petName} config={SURVEY_TITLES.step7} />
            <Controller
              name="step7.bodyCondition"
              control={control}
              render={({ field }) => {
                const { onToggle, isSelected } = useSurveyToggleOption(
                  field.value,
                  "radio",
                  (value) => {
                    field.onChange(value);
                    handleChange();
                  }
                );
                return (
                  <div className={styles.colSurveyButtonWrapper}>
                    {SURVEY_FORM_INFO.dogLifestyle.bodyCondition.options.map(
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
