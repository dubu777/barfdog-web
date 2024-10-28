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

export default function SurveyStep10({
  formData,
  handleChange,
}: SurveyStep2Props) {
  
  return (
      <SurveyButtonList
        options={HEALTH_INFO.snackCountLevel.options}
        name={HEALTH_INFO.snackCountLevel.name}
        title={HEALTH_INFO.snackCountLevel.title}
        selectedValue={formData.snackCountLevel}
        petName={formData.name}
        onChange={(value) =>
          handleChange(HEALTH_INFO.snackCountLevel.name, value as string)
        }
      />
  );
}
