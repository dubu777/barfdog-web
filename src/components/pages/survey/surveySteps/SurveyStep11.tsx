
import { SURVEY_FORM_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller } from "react-hook-form";

interface SurveyStepProps {
  handleChange: () => void;
  control: Control<SurveyStepValues>;
  petName: string;
}

export default function SurveyStep11({
  handleChange,
  control,
  petName,
}: SurveyStepProps) {
  
  return (
    <Controller
      name="step11.waterCountLevel"
      control={control}
      render={({ field }) => (
        <SurveyButtonList
          options={SURVEY_FORM_INFO.waterCountLevel.options}
          title={SURVEY_FORM_INFO.waterCountLevel.title}
          selectedValue={field.value}
          petName={petName}
          onChange={(value) => {
            field.onChange(value);
            handleChange();
          }}
        />
      )}
    />
  );
}
