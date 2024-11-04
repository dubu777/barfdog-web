import { SurveyFormData } from "@/types/survey";
import { SURVEY_FORM_INFO } from "@/constants";
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
        options={SURVEY_FORM_INFO.dogStatus.options}
        title={SURVEY_FORM_INFO.dogStatus.title}
        selectedValue={formData.dogStatus}
        petName={formData.name}
        layoutType="col"
        isMultiSelect={true}
        onChange={(value) =>
          handleChange(SURVEY_FORM_INFO.dogStatus.id, value as string, true)
        }
      />
  );
}
