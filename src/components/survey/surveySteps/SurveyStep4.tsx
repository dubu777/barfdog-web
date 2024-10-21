import { SurveyFormData } from "@/types/survey";
import { BASIC_INFO } from "@/constants";
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
        options={BASIC_INFO.dogSize.options}
        name={BASIC_INFO.dogSize.name}
        title={BASIC_INFO.dogSize.title}
        selectedValue={formData.dogSize}
        petName={formData.name}
        layoutType="row"
        selectionType="single"
        onChange={(value) =>
          handleChange(BASIC_INFO.dogSize.name, value as string)
        }
      />
        <SearchableSelectBox
          selectedValue={formData.dogType}
          options={BASIC_INFO.dogType.options}
          onChange={(value) => handleChange(BASIC_INFO.dogType.name, value)}
          placeholder={BASIC_INFO.dogType.placeholder}
        />
    </div>
  );
}
