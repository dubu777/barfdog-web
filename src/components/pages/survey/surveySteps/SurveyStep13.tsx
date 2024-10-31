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

export default function SurveyStep13({
  formData,
  handleChange,
}: SurveyStep2Props) {
  
  return (
      <SurveyButtonList
        options={HEALTH_INFO.inedibleFood.options}
        name={HEALTH_INFO.inedibleFood.name}
        title={HEALTH_INFO.inedibleFood.title}
        selectedValue={formData.inedibleFood}
        petName={formData.name}
        layoutType="grid"
        isMultiSelect
        onChange={(value) =>
          handleChange(HEALTH_INFO.inedibleFood.name, value as string, true)
        }
      />
  );
}
