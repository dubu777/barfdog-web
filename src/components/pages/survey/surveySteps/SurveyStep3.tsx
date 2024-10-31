import { SurveyFormData } from "@/types/survey";
import { BASIC_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";

interface SurveyStep3Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K],
    isMultiSelect?: boolean
  ) => void;
}

export default function SurveyStep3({
  formData,
  handleChange,
}: SurveyStep3Props) {
  
  return (
      <SurveyButtonList
        options={BASIC_INFO.neutralization.options}
        name={BASIC_INFO.neutralization.name}
        title={BASIC_INFO.neutralization.title}
        selectedValue={formData.neutralization}
        petName={formData.name}
        onChange={(value) =>
          handleChange(BASIC_INFO.neutralization.name, value as boolean)
        }
      />
  );
}
