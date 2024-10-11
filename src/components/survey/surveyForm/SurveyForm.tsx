"use client";

import { SurveyFormData } from "@/types/survey";
import SurveyStep1 from "../surveySteps/SurveyStep1";

interface SurveyFormProps {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K]
  ) => void;
}

export default function SurveyForm({
  formData,
  handleChange,
}: SurveyFormProps) {
  return (
    <>
      <SurveyStep1 formData={formData} handleChange={handleChange} />
    </>
  );
}
