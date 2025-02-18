
import { SURVEY_FORM_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller } from "react-hook-form";

interface SurveyStep2Props {
  handleChange: () => void;
  control: Control<SurveyStepValues>;
  petName: string;
}

export default function SurveyStep7({
  handleChange,
  control,
  petName,
}: SurveyStep2Props) {
  
  return (
    <Controller
    name="step7.dogStatus"
    control={control}
    render={({ field }) => (
      <SurveyButtonList
        options={SURVEY_FORM_INFO.dogStatus.options}
        title={SURVEY_FORM_INFO.dogStatus.title}
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
