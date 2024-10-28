import { SurveyFormData } from "@/types/survey";
import { BASIC_INFO } from "@/constants";
import SurveyTextField from "../surveyTextField/SurveyTextField";

interface SurveyStep2Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K]
  ) => void;
  handleBlur: (
    e: React.FocusEvent<HTMLInputElement>,
    key: keyof SurveyFormData
  ) => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    key: keyof SurveyFormData
  ) => void;
}

export default function SurveyStep6({
  formData,
  handleChange,
  handleBlur,
  handleKeyDown,
}: SurveyStep2Props) {
  return (
    <SurveyTextField
      id={BASIC_INFO.weight.id}
      title={BASIC_INFO.weight.title}
      name={BASIC_INFO.weight.name}
      value={formData.weight}
      placeholder={BASIC_INFO.weight.placeholder}
      petName={formData.name}
      onChange={(value) => handleChange(BASIC_INFO.weight.name, value)}
      onBlur={(e) => handleBlur(e, BASIC_INFO.name.name)}
      onKeyDown={(e) => handleKeyDown(e, BASIC_INFO.name.name)} 
      unit="kg"
    />
  );
}
