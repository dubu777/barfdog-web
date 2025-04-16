import { SURVEY_FORM_INFO, SURVEY_TITLES } from "@/constants";
import * as styles from "./SurveySteps.css";
import { Controller, useFormContext } from "react-hook-form";
import SurveyTitle from "../surveyTitle/SurveyTitle";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";

interface SurveyStepProps {
  handleChange: () => void;
  petName: string;
}

export default function SurveyStep4({
  handleChange,
  petName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  return (
    <div className={styles.surveyStepContainer}>
      <SurveyTitle petName={petName} titleTemplates={SURVEY_TITLES.step4} />
    </div>
  );
}
