import { SurveyFormData } from "@/types/survey";
import { BASIC_INFO } from "@/constants";
import SurveyTextField from "@/components/survey/surveyTextField/SurveyTextField";

interface SurveyStep1Props {
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

export default function SurveyStep1({
  formData,
  handleChange,
  handleBlur,
  handleKeyDown,
}: SurveyStep1Props) {

  return (
      <SurveyTextField
        id={BASIC_INFO.name.id}
        title={BASIC_INFO.name.title}
        name={BASIC_INFO.name.name}
        value={formData.name}
        placeholder={BASIC_INFO.name.placeholder}
        onChange={(value) => handleChange(BASIC_INFO.name.name, value)}
        onBlur={(e) => handleBlur(e, BASIC_INFO.name.name)}
        onKeyDown={(e) => handleKeyDown(e, BASIC_INFO.name.name)} 
      />
  );
}
