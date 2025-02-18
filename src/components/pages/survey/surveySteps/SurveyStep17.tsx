
import { SURVEY_FORM_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller } from "react-hook-form";

interface SurveyStepProps {
  handleChange: () => void;
  control: Control<SurveyStepValues>;
  petName: string;
}

export default function SurveyStep17({
  handleChange,
  control,
  petName,
}: SurveyStepProps) {
  return (
    <Controller
      name="step17.priorityConcerns"
      control={control}
      render={({ field }) => (
        <SurveyButtonList
          options={SURVEY_FORM_INFO.priorityConcerns.options}
          title={SURVEY_FORM_INFO.priorityConcerns.title}
          selectedValue={field.value}
          petName={petName}
          layoutType="grid"
          isMultiSelect
          onChange={(value) => {
            field.onChange(value);
            handleChange();
          }}
        />
      )}
    />
  );
}
