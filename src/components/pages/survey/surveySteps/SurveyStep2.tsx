import { SurveyFormData } from "@/types/survey";
import { SURVEY_FORM_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";

interface SurveyStep2Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K],
    isMultiSelect?: boolean
  ) => void;
}

export default function SurveyStep2({
  formData,
  handleChange,
}: SurveyStep2Props) {
  
  return (
      <SurveyButtonList
        options={SURVEY_FORM_INFO.gender.options}
        title={SURVEY_FORM_INFO.gender.title}
        selectedValue={formData.gender}
        petName={formData.name}
        onChange={(value) =>
          handleChange(SURVEY_FORM_INFO.gender.id, value as string)
        }
      />
  );
}
