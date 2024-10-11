import DefaultTextField from "@/components/common/defaultTextField/DefaultTextField";
import * as styles from "./SurveySteps.css";
import { SurveyFormData } from "@/types/survey";
import { BASIC_INFO } from "@/constants";

interface SurveyStep1Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K]
  ) => void;
}

export default function SurveyStep2({
  formData,
  handleChange,
}: SurveyStep1Props) {

  return (
    <>
      
    </>
  );
}
