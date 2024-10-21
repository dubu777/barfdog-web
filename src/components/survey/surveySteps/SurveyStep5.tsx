"use client";

import { SurveyFormData } from "@/types/survey";
import * as styles from "./SurveySteps.css";
import SelectBox from "../selectBox/SelectBox";
import { surveyInputWrapper, surveyTitle } from "@/app/survey/Survey.css";
import { useEffect, useState } from "react";
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
  const years = Array.from({ length: 50 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );
  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  useEffect(() => {
    const savedBirth = formData.birth;
    if (savedBirth) {
      setYear(savedBirth.slice(0, 4));
      setMonth(savedBirth.slice(4, 6));
    }
  }, [formData.birth]);

  const handleBirthChange = (newYear: string, newMonth: string) => {
    setYear(newYear);
    setMonth(newMonth);

    if (newYear && newMonth) {
      handleChange("birth", `${newYear}${newMonth}`);
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
          options={years}
          placeholder="년도"
          onSelect={(value) => handleBirthChange(value, month)}
          selectedValue={year}
        />

        <SelectBox
          id="mm"
          options={months}
          placeholder="월"
          onSelect={(value) => handleBirthChange(year, value)}
          selectedValue={month}
        />
      </div>
    </div>
  );
}
