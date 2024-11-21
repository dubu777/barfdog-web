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

export default function SurveyStep8({
  formData,
  handleChange,
}: SurveyStep2Props) {
  
  return (
      <SurveyButtonList
        options={SURVEY_FORM_INFO.activityLevel.options}
        title={SURVEY_FORM_INFO.activityLevel.title}
        selectedValue={formData.activityLevel}
        petName={formData.name}
        layoutType="col"
        onChange={(value) =>
          handleChange(SURVEY_FORM_INFO.activityLevel.id, value as string)
        }
      />
  );
}
