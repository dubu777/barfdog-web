import { SurveyFormData } from "@/types/survey";
import { SURVEY_FORM_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";
import * as styles from './SurveySteps.css';
import SearchableSelectBox from "../searchableSelectBox/SearchableSelectBox";

interface SurveyStep2Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K]
  ) => void;
}

export default function SurveyStep4({
  formData,
  handleChange,
}: SurveyStep2Props) {
  
  return (
    <div className={styles.surveyStep4Container}>
      <SurveyButtonList
        options={SURVEY_FORM_INFO.dogSize.options}
        title={SURVEY_FORM_INFO.dogSize.title}
        selectedValue={formData.dogSize}
        petName={formData.name}
        layoutType="row"
        onChange={(value) =>
          handleChange(SURVEY_FORM_INFO.dogSize.id, value as string)
        }
      />
        <SearchableSelectBox
          selectedValue={formData.dogType}
          options={SURVEY_FORM_INFO.dogType.options}
          onChange={(value) => handleChange(SURVEY_FORM_INFO.dogType.id, value)}
          placeholder1={SURVEY_FORM_INFO.dogType.placeholder1}
          placeholder2={SURVEY_FORM_INFO.dogType.placeholder2}
        />
    </div>
  );
}
