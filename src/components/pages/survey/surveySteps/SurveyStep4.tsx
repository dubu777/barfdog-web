
import { SURVEY_FORM_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";
import * as styles from "./SurveySteps.css";
import SearchableSelectBox from "../searchableSelectBox/SearchableSelectBox";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller } from "react-hook-form";

interface SurveyStepProps {
  handleChange: () => void;
  control: Control<SurveyStepValues>;
  petName: string;
}

export default function SurveyStep4({
  handleChange,
  control,
  petName,
}: SurveyStepProps) {
  return (
    <div className={styles.surveyContainer}>
      <Controller
        name="step4.dogSize"
        control={control}
        render={({ field }) => (
          <SurveyButtonList
            options={SURVEY_FORM_INFO.dogSize.options}
            title={SURVEY_FORM_INFO.dogSize.title}
            selectedValue={field.value}
            petName={petName}
            layoutType="row"
            onChange={(value) => {
              field.onChange(value);
              handleChange();
            }}
          />
        )}
      />
      <Controller
        name="step4.dogType"
        control={control}
        render={({ field }) => (
          <SearchableSelectBox
            selectedValue={field.value}
            options={SURVEY_FORM_INFO.dogType.options}
            placeholder1={SURVEY_FORM_INFO.dogType.placeholder1}
            placeholder2={SURVEY_FORM_INFO.dogType.placeholder2}
            onChange={(value) => {
              field.onChange(value); // Update RHF state
              handleChange(); // Call custom handler
            }}
          />
        )}
      />
    </div>
  );
}
