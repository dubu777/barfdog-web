import { SurveyFormData } from "@/types/survey";
import { ACTIVITY_INFO, BASIC_INFO } from "@/constants";
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
        options={ACTIVITY_INFO.activityLevel.options}
        name={ACTIVITY_INFO.activityLevel.name}
        title={ACTIVITY_INFO.activityLevel.title}
        selectedValue={formData.activityLevel}
        petName={formData.name}
        selectionType="single"
        onChange={(value) =>
          handleChange(ACTIVITY_INFO.activityLevel.name, value as string)
        }
      />
  );
}
