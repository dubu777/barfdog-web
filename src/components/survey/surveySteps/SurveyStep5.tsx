"use client";

import { SurveyFormData } from "@/types/survey";
import * as styles from "./SurveySteps.css";
import SelectBox from "../selectBox/SelectBox";
import { surveyInputWrapper, surveyTitle } from "@/app/survey/Survey.css";
import { useState } from "react";
import { getPetNameWithSuffix } from "@/utils";
import { BASIC_INFO } from "@/constants";

interface SurveyStep2Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K]
  ) => void;
}

export default function SurveyStep5({
  formData,
  handleChange,
}: SurveyStep2Props) {

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
console.log(year, 'year');

  const handleBirthChange = (newYear: string, newMonth: string) => {
    setYear(newYear);
    setMonth(newMonth);

    if (newYear && newMonth) {
      handleChange(BASIC_INFO.birth.name, `${newYear}${newMonth}`);
    }
  };

  const title = BASIC_INFO.birth.title
  const petName = formData.name
  const fullTitle = title && petName
  ? getPetNameWithSuffix(petName, title) 
  : title;

  return (
    <div className={surveyInputWrapper}>
      <h2 className={surveyTitle}>{fullTitle}</h2>
      <div className={styles.birthContainer}>
        <SelectBox
          id="yyyy"
          options={BASIC_INFO.birth.years}
          placeholder="년도"
          onSelect={(value) => handleBirthChange(value, month)}
          selectedValue={year || formData.birth.slice(0, 4)}
        />

        <SelectBox
          id="mm"
          options={BASIC_INFO.birth.months}
          placeholder="월"
          onSelect={(value) => handleBirthChange(year, value)}
          selectedValue={month || formData.birth.slice(4, 6)}
        />
      </div>
    </div>
  );
}
