import { SURVEY_FORM_INFO } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller, useFormContext, useWatch } from "react-hook-form";

interface SurveyStepProps {
  handleChange: () => void;
  handleBlur: (fieldName: string) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: string
  ) => Promise<void>;
  handleNextStep: () => void;
  petName: string;
}

export default function SurveyStep12({
  handleChange,
  handleBlur,
  handleKeyDown,
  handleNextStep,
  petName,
}: SurveyStepProps) {
    const { control } = useFormContext<SurveyStepValues>();
  
  return (
    <>
    
    </>
  );
}
