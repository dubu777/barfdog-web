import { SurveyFormData } from "@/types/survey";
import { HEALTH_INFO } from "@/constants";
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
        options={HEALTH_INFO.currentMeal.options}
        name={HEALTH_INFO.currentMeal.name}
        title={HEALTH_INFO.currentMeal.title}
        selectedValue={formData.currentMeal}
        petName={formData.name}
        layoutType="grid"
        isMultiSelect
        onChange={(value) =>
          handleChange(HEALTH_INFO.currentMeal.name, value as string, true)
        }
      />
  );
}
