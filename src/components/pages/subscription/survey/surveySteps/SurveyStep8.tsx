
import { SURVEY_FORM_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller } from "react-hook-form";

interface SurveyStepProps {
  handleChange: () => void;
  control: Control<SurveyStepValues>;
  petName: string;
}

export default function SurveyStep8({
  handleChange,
  control,
  petName,
}: SurveyStepProps) {
  
  return (
    <Controller
      name="step8.activityLevel"
      control={control}
      render={({ field }) => (
        <SurveyButtonList
          options={SURVEY_FORM_INFO.activityLevel.options}
          title={SURVEY_FORM_INFO.activityLevel.title}
          selectedValue={field.value}
          petName={petName}
          layoutType="col"
          onChange={(value) => {
            field.onChange(value);
            handleChange();
          }}
        />
      )}
    />
  );
}