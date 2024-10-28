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

export default function SurveyStep15({
  formData,
  handleChange,
}: SurveyStep2Props) {
  
  return (
      <SurveyButtonList
        options={HEALTH_INFO.caution.options}
        name={HEALTH_INFO.caution.name}
        title={HEALTH_INFO.caution.title}
        selectedValue={formData.caution}
        petName={formData.name}
        layoutType="grid"
        isMultiSelect
        onChange={(value) =>
          handleChange(HEALTH_INFO.caution.name, value as string, true)
        }
      />
  );
}
