import { SurveyFormData } from "@/types/survey";
import { BASIC_INFO } from "@/constants";
import SurveyTextField from "../surveyTextField/SurveyTextField";

interface SurveyStep2Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K]
  ) => void;
}

export default function SurveyStep6({
  formData,
  handleChange,
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
      unit="kg"
    />
  );
}
