import { SurveyFormData } from "@/types/survey";
import { SURVEY_FORM_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";
import SurveyTextField from "../surveyTextField/SurveyTextField";
import { useEffect, useState } from "react";

interface SurveyStep2Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K],
    isMultiSelect?: boolean
  ) => void;
}

export default function SurveyStep12({
  formData,
  handleChange,
}: SurveyStep2Props) {
  const [showEtcField, setShowEtcField] = useState(false);

  useEffect(() => {
    if (
      Array.isArray(formData.supplement) &&
      formData.supplement.includes("ETC")
    ) {
      setShowEtcField(true);
    } else {
      setShowEtcField(false);
    }
  }, [formData.supplement]);

  return (
    <>
      <SurveyButtonList
        options={SURVEY_FORM_INFO.supplement.options}
        title={SURVEY_FORM_INFO.supplement.title}
        selectedValue={formData.supplement}
        petName={formData.name}
        layoutType="grid"
        isMultiSelect
        onChange={(value) =>
          handleChange(SURVEY_FORM_INFO.supplement.id, value as string, true)
        }
      />
      {showEtcField && (
        <SurveyTextField
          id={SURVEY_FORM_INFO.supplementEtc.id}
          value={formData.supplementEtc}
          onChange={(value) =>
            handleChange(SURVEY_FORM_INFO.supplementEtc.id, value)
          }
          placeholder={SURVEY_FORM_INFO.supplementEtc.placeholder}
        />
      )}
    </>
  );
}
