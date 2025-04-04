
import { SURVEY_FORM_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller } from "react-hook-form";

interface SurveyStepProps {
  handleChange: () => void;
  control: Control<SurveyStepValues>;
  petName: string;
}

export default function SurveyStep14({
  handleChange,
  control,
  petName,
}: SurveyStepProps) {
  
  return (
    <Controller
      name="step14.currentMeal"
      control={control}
      render={({ field }) => (
        <SurveyButtonList
          options={SURVEY_FORM_INFO.currentMeal.options}
          title={SURVEY_FORM_INFO.currentMeal.title}
          selectedValue={field.value}
          petName={petName}
          layoutType="grid"
          onChange={(value) => {
            field.onChange(value);
            handleChange();
          }}
        />
      )}
    />
  );
}