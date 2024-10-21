import { SurveyFormData } from "@/types/survey";
import { BASIC_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";

interface SurveyStep2Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K]
  ) => void;
}

export default function SurveyStep2({
  formData,
  handleChange,
}: SurveyStep2Props) {
  
  return (
      <SurveyButtonList
        options={BASIC_INFO.gender.options}
        name={BASIC_INFO.gender.name}
        title={BASIC_INFO.gender.title}
        selectedValue={formData.gender}
        petName={formData.name}
        selectionType="single"
        onChange={(value) =>
          handleChange(BASIC_INFO.gender.name, value as string)
        }
      />
  );
}
