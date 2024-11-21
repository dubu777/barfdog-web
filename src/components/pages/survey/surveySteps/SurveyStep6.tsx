import { SurveyFormData } from "@/types/survey";
import { SURVEY_FORM_INFO } from "@/constants";
import SurveyTextField from "../surveyTextField/SurveyTextField";
import { ErrorValuesType } from "@/store/useSurveyStore";
import { errorMessage } from "./SurveySteps.css";

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
  errorMessages: ErrorValuesType;
}

export default function SurveyStep6({
  formData,
  handleChange,
  handleBlur,
  handleKeyDown,
  errorMessages,
}: SurveyStep2Props) {
  
  return (
    <>
      <SurveyTextField
        id={SURVEY_FORM_INFO.weight.id}
        title={SURVEY_FORM_INFO.weight.title}
        value={formData.weight}
        placeholder={SURVEY_FORM_INFO.weight.placeholder}
        petName={formData.name}
        onChange={(value) => handleChange(SURVEY_FORM_INFO.weight.id, value)}
        onBlur={(e) => handleBlur(e, SURVEY_FORM_INFO.weight.id)}
        onKeyDown={(e) => handleKeyDown(e, SURVEY_FORM_INFO.weight.id)}
        unit="kg"
      />
      <p className={errorMessage}>{errorMessages["step5"]["weight"]}</p>
    </>
  );
}
