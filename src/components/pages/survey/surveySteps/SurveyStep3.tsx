
import { SURVEY_FORM_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller } from "react-hook-form";

interface SurveyStep3Props {
  handleChange: () => void;
  control: Control<SurveyStepValues>;
  petName: string;
}

export default function SurveyStep3({
  handleChange,
  control,
  petName,
}: SurveyStep3Props) {
  return (
    <Controller
      name="step3.neutralization"
      control={control}
      render={({ field }) => (
        <SurveyButtonList
          options={SURVEY_FORM_INFO.neutralization.options}
          title={SURVEY_FORM_INFO.neutralization.title}
          selectedValue={field.value ?? null}
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
