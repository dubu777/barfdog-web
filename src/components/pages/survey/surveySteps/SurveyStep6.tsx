import { SURVEY_FORM_INFO } from "@/constants";
import SurveyTextField from "../surveyTextField/SurveyTextField";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller, FieldErrors, useFormContext } from "react-hook-form";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface SurveyStepProps {
  handleChange: () => void;
  handleBlur: (fieldName: string) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: string
  ) => Promise<void>;
  petName: string;
}

export default function SurveyStep6({
  handleChange,
  handleBlur,
  handleKeyDown,
  petName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  return (
    <>
    
    </>
  );
}
