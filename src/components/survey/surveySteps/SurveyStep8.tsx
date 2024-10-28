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

export default function SurveyStep8({
  formData,
  handleChange,
}: SurveyStep2Props) {
  
  return (
      <SurveyButtonList
        options={HEALTH_INFO.activityLevel.options}
        name={HEALTH_INFO.activityLevel.name}
        title={HEALTH_INFO.activityLevel.title}
        selectedValue={formData.activityLevel}
        petName={formData.name}
        layoutType="col"
        onChange={(value) =>
          handleChange(HEALTH_INFO.activityLevel.name, value as string)
        }
      />
  );
}
