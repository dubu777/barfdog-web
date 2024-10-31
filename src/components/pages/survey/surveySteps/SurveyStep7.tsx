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

export default function SurveyStep7({
  formData,
  handleChange,
}: SurveyStep2Props) {
  
  return (
      <SurveyButtonList
        options={HEALTH_INFO.dogStatus.options}
        name={HEALTH_INFO.dogStatus.name}
        title={HEALTH_INFO.dogStatus.title}
        selectedValue={formData.dogStatus}
        petName={formData.name}
        layoutType="col"
        isMultiSelect={true}
        onChange={(value) =>
          handleChange(HEALTH_INFO.dogStatus.name, value as string, true)
        }
      />
  );
}
