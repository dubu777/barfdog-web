import DefaultTextField from "@/components/survey/surveyTextField/SurveyTextField";
import * as styles from "./SurveySteps.css";
import { SurveyFormData } from "@/types/survey";
import { BASIC_INFO } from "@/constants";

interface SurveyStep1Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K]
  ) => void;
}

export default function SurveyStep1({
  formData,
  handleChange,
}: SurveyStep1Props) {

  return (
      <DefaultTextField
        id={BASIC_INFO.name.id}
        title={BASIC_INFO.name.title}
        name={BASIC_INFO.name.name}
        value={formData.name}
        placeholder={BASIC_INFO.name.placeholder}
        onChange={(value) => handleChange(BASIC_INFO.name.name, value)}
      />
  );
}
