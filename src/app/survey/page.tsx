"use client";

import Header from "@/components/layout/header/Header";
import useForm from "@/hooks/useForm";
import * as styles from "./Survey.css";
import { SurveyFormData } from "@/types/survey";
import { initialSurveyValue } from "@/constants";
import SurveyForm from "@/components/survey/surveyForm/SurveyForm";

export default function SurveyPage() {
  const { formData, handleChange } = useForm<SurveyFormData>(initialSurveyValue);
  return (
    <>
      <Header type="redBackground" />
      <div className={styles.surveyContainer}>
        <SurveyForm formData={formData} handleChange={handleChange} />
      </div>
    </>
  );
}
