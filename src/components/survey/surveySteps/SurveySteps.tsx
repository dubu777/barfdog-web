import SurveyStep1 from "../surveySteps/SurveyStep1";
import SurveyStep2 from "../surveySteps/SurveyStep2";
import { SurveyFormData } from "@/types/survey";
import SurveyStep3 from "./SurveyStep3";
import SurveyStep4 from "./SurveyStep4";

interface Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K]
  ) => void;
}

export const getSurveySteps = ({ formData, handleChange }: Props) => {
  return [
    <SurveyStep1 formData={formData} handleChange={handleChange} />,
    <SurveyStep2 formData={formData} handleChange={handleChange} />,
    <SurveyStep3 formData={formData} handleChange={handleChange} />,
    <SurveyStep4 formData={formData} handleChange={handleChange} />,
    <SurveyStep2 formData={formData} handleChange={handleChange} />,
  ];
};
