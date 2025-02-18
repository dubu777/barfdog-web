
import { SURVEY_FORM_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller } from "react-hook-form";

interface SurveyStep2Props {
  handleChange: () => void;
  control: Control<SurveyStepValues>;
  petName: string;
}

export default function SurveyStep10({
  handleChange,
  control,
  petName,
}: SurveyStep2Props) {
  
  return (
    <Controller
      name="step10.snackCountLevel"
      control={control}
      render={({ field }) => (
        <SurveyButtonList
          options={SURVEY_FORM_INFO.snackCountLevel.options}
          title={SURVEY_FORM_INFO.snackCountLevel.title}
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