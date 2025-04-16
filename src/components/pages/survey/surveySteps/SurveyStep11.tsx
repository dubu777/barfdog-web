
import { SURVEY_FORM_INFO } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller, useFormContext } from "react-hook-form";

interface SurveyStepProps {
  handleChange: () => void;
  petName: string;
}

export default function SurveyStep11({
  handleChange,
  petName,
}: SurveyStepProps) {
    const { control } = useFormContext<SurveyStepValues>();
  
  return (
    <></>
  );
}
