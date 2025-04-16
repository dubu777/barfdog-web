
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller, useFormContext } from "react-hook-form";

interface SurveyStepProps {
  handleChange: () => void;
  petName: string;
}

export default function SurveyStep7({
  handleChange,
  petName,
}: SurveyStepProps) {
    const { control } = useFormContext<SurveyStepValues>();
  
  return (
<></>
  );
}
