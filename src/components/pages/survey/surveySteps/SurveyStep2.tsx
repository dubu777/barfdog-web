
import { SURVEY_FORM_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller } from "react-hook-form";

interface SurveyStep2Props {
  handleChange: () => void;
  control: Control<SurveyStepValues>;
  petName: string;
}

export default function SurveyStep2({
  handleChange,
  control,
  petName,
}: SurveyStep2Props) {
  
  return (
    <Controller
    name="step2.gender"
    control={control}
    render={({ field }) => (
      <SurveyButtonList
        options={SURVEY_FORM_INFO.gender.options}
        title={SURVEY_FORM_INFO.gender.title}
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
