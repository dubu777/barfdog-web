import SurveyStep1 from "../surveySteps/SurveyStep1";
import SurveyStep2 from "../surveySteps/SurveyStep2";
import { SurveyFormData } from "@/types/survey";
import SurveyStep3 from "./SurveyStep3";
import SurveyStep4 from "./SurveyStep4";
import SurveyStep5 from "./SurveyStep5";
import SurveyStep6 from "./SurveyStep6";
import SurveyStep7 from "./SurveyStep7";
import SurveyStep8 from "./SurveyStep8";
import SurveyStep9 from "./SurveyStep9";
import SurveyStep10 from "./SurveyStep10";
import SurveyStep11 from "./SurveyStep11";
import SurveyStep12 from "./surveyStep12";
import { ErrorValuesType } from "@/store/useSurveyStore";
import SurveyStep13 from "./SurveyStep13";
import SurveyStep14 from "./SurveyStep14";
import SurveyStep15 from "./SurveyStep15";
import SurveyStep16 from "./SurveyStep16";
import SurveyStep17 from "./SurveyStep17";

interface Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K]
  ) => void;
  errorMessages: ErrorValuesType;
  handleBlur: (
    e: React.FocusEvent<HTMLInputElement>,
    key: keyof SurveyFormData
  ) => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    key: keyof SurveyFormData
  ) => void;
}

export const getSurveySteps = ({
  formData,
  errorMessages,
  handleChange,
  handleBlur,
  handleKeyDown,
}: Props) => {
  console.log("errr", errorMessages);

  return [
    <SurveyStep1
      formData={formData}
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
    />,
    <SurveyStep2 formData={formData} handleChange={handleChange} />,
    <SurveyStep3 formData={formData} handleChange={handleChange} />,
    <SurveyStep4 formData={formData} handleChange={handleChange} />,
    <SurveyStep5 formData={formData} handleChange={handleChange} />,
    <SurveyStep6
      formData={formData}
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
    />,
    <SurveyStep7 formData={formData} handleChange={handleChange} />,
    <SurveyStep8 formData={formData} handleChange={handleChange} />,
    <SurveyStep9 formData={formData} handleChange={handleChange} />,
    <SurveyStep10 formData={formData} handleChange={handleChange} />,
    <SurveyStep11 formData={formData} handleChange={handleChange} />,
    <SurveyStep12 formData={formData} handleChange={handleChange} />,
    <SurveyStep13 formData={formData} handleChange={handleChange} />,
    <SurveyStep14 formData={formData} handleChange={handleChange} />,
    <SurveyStep15 formData={formData} handleChange={handleChange} />,
    <SurveyStep16 formData={formData} handleChange={handleChange} />,
    <SurveyStep17 formData={formData} handleChange={handleChange} />,
  ];
};
