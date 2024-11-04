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

export default function SurveyStep11({
  formData,
  handleChange,
}: SurveyStep2Props) {
  
  return (
      <SurveyButtonList
        options={SURVEY_FORM_INFO.waterCountLevel.options}
        title={SURVEY_FORM_INFO.waterCountLevel.title}
        selectedValue={formData.waterCountLevel}
        petName={formData.name}
        onChange={(value) =>
          handleChange(SURVEY_FORM_INFO.waterCountLevel.id, value as string)
        }
      />
  );
}
