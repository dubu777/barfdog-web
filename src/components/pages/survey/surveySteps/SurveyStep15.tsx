import { SurveyFormData } from "@/types/survey";
import { SURVEY_FORM_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";
import { useEffect, useState } from "react";
import SurveyTextField from "../surveyTextField/SurveyTextField";

interface SurveyStep2Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K],
    isMultiSelect?: boolean
  ) => void;
}

export default function SurveyStep15({
  formData,
  handleChange,
}: SurveyStep2Props) {
  const [showEtcField, setShowEtcField] = useState(false);

  useEffect(() => {
    if (
      Array.isArray(formData.caution) &&
      formData.caution.includes("ETC")
    ) {
      setShowEtcField(true);
    } else {
      setShowEtcField(false);
    }
  }, [formData.caution]);

  return (
    <>
      <SurveyButtonList
        options={SURVEY_FORM_INFO.caution.options}
        title={SURVEY_FORM_INFO.caution.title}
        selectedValue={formData.caution}
        petName={formData.name}
        layoutType="grid"
        isMultiSelect
        onChange={(value) =>
          handleChange(SURVEY_FORM_INFO.caution.id, value as string, true)
        }
      />
      {showEtcField && (
        <SurveyTextField
          id={SURVEY_FORM_INFO.cautionEtc.id}
          value={formData.cautionEtc}
          onChange={(value) => handleChange(SURVEY_FORM_INFO.cautionEtc.id, value)}
          placeholder={SURVEY_FORM_INFO.cautionEtc.placeholder}
        />
      )}
    </>
  );
}
