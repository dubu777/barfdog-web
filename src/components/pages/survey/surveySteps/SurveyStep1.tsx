import { SurveyFormData } from "@/types/survey";
import { SURVEY_FORM_INFO } from "@/constants";
import { ErrorValuesType } from "@/store/useSurveyStore";
import SurveyTextField from "../surveyTextField/SurveyTextField";
import { errorMessage } from "./SurveySteps.css";

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
  errorMessages: ErrorValuesType,
}

export default function SurveyStep1({
  formData,
  handleChange,
  handleBlur,
  handleKeyDown,
  errorMessages,
}: SurveyStep1Props) {

  return (
    <>
      <SurveyTextField
        id={SURVEY_FORM_INFO.name.id}
        title={SURVEY_FORM_INFO.name.title}
        value={formData.name}
        placeholder={SURVEY_FORM_INFO.name.placeholder}
        onChange={(value) => handleChange(SURVEY_FORM_INFO.name.id, value)}
        onBlur={(e) => handleBlur(e, SURVEY_FORM_INFO.name.id)}
        onKeyDown={(e) => handleKeyDown(e, SURVEY_FORM_INFO.name.id)}
      />
      <p className={errorMessage}>{errorMessages["step0"]["name"]}</p>
    </>
  );
}
