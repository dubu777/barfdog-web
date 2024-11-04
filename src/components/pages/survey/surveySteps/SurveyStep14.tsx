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

export default function SurveyStep14({
  formData,
  handleChange,
}: SurveyStep2Props) {
  
  return (
      <SurveyButtonList
        options={SURVEY_FORM_INFO.currentMeal.options}
        title={SURVEY_FORM_INFO.currentMeal.title}
        selectedValue={formData.currentMeal}
        petName={formData.name}
        layoutType="grid"
        isMultiSelect
        onChange={(value) =>
          handleChange(SURVEY_FORM_INFO.currentMeal.id, value as string, true)
        }
      />
  );
}
