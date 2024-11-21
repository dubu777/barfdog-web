import { SurveyFormData } from "@/types/survey";
import { SURVEY_FORM_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";

interface SurveyStep3Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K],
    isMultiSelect?: boolean
  ) => void;
}

export default function SurveyStep3({
  formData,
  handleChange,
}: SurveyStep3Props) {
  
  return (
      <SurveyButtonList
        options={SURVEY_FORM_INFO.neutralization.options}
        title={SURVEY_FORM_INFO.neutralization.title}
        selectedValue={formData.neutralization}
        petName={formData.name}
        onChange={(value) =>
          handleChange(SURVEY_FORM_INFO.neutralization.id, value as boolean)
        }
      />
  );
}
