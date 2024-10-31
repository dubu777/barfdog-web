import { SurveyFormData } from "@/types/survey";
import { ADDITIONAL_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";

interface SurveyStep2Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K],
    isMultiSelect?: boolean
  ) => void;
}

export default function SurveyStep16({
  formData,
  handleChange,
}: SurveyStep2Props) {
  
  return (
      <SurveyButtonList
        options={ADDITIONAL_INFO.newToRawDiet.options}
        name={ADDITIONAL_INFO.newToRawDiet.name}
        title={ADDITIONAL_INFO.newToRawDiet.title}
        selectedValue={formData.newToRawDiet}
        petName={formData.name}
        onChange={(value) =>
          handleChange(ADDITIONAL_INFO.newToRawDiet.name, value as boolean)
        }
      />
  );
}
