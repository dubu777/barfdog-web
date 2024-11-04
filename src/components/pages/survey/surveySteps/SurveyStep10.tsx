import { SurveyFormData } from "@/types/survey";
import { SURVEY_FORM_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";

interface SurveyStep2Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K]
  ) => void;
}

export default function SurveyStep10({
  formData,
  handleChange,
}: SurveyStep2Props) {
  
  return (
      <SurveyButtonList
        options={SURVEY_FORM_INFO.snackCountLevel.options}
        title={SURVEY_FORM_INFO.snackCountLevel.title}
        selectedValue={formData.snackCountLevel}
        petName={formData.name}
        onChange={(value) =>
          handleChange(SURVEY_FORM_INFO.snackCountLevel.id, value as string)
        }
      />
  );
}
