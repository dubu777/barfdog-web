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

export default function SurveyStep16({
  formData,
  handleChange,
}: SurveyStep2Props) {
  
  return (
      <SurveyButtonList
        options={SURVEY_FORM_INFO.newToRawDiet.options}
        title={SURVEY_FORM_INFO.newToRawDiet.title}
        selectedValue={formData.newToRawDiet}
        petName={formData.name}
        onChange={(value) =>
          handleChange(SURVEY_FORM_INFO.newToRawDiet.id, value as boolean)
        }
      />
  );
}
