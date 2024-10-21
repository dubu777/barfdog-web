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

export default function SurveyStep7({
  formData,
  handleChange,
}: SurveyStep2Props) {
  
  return (
      <SurveyButtonList
        options={ACTIVITY_INFO.dogStatus.options}
        name={ACTIVITY_INFO.dogStatus.name}
        title={ACTIVITY_INFO.dogStatus.title}
        selectedValue={formData.dogStatus}
        petName={formData.name}
        selectionType="single"
        onChange={(value) =>
          handleChange(ACTIVITY_INFO.dogStatus.name, value as string)
        }
      />
  );
}
