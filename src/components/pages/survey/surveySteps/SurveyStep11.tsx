import { SurveyFormData } from "@/types/survey";
import { HEALTH_INFO } from "@/constants";
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
        options={HEALTH_INFO.waterCountLevel.options}
        name={HEALTH_INFO.waterCountLevel.name}
        title={HEALTH_INFO.waterCountLevel.title}
        selectedValue={formData.waterCountLevel}
        petName={formData.name}
        onChange={(value) =>
          handleChange(HEALTH_INFO.waterCountLevel.name, value as string)
        }
      />
  );
}
