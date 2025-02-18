"use client";


import * as styles from "./SurveySteps.css";
import SelectBox from "../selectBox/SelectBox";
import { surveyInputWrapper, surveyTitle } from "@/app/survey/Survey.css";
import { useEffect, useState } from "react";
import { getNameWithPossessiveSuffix2 } from "@/utils";
import { SURVEY_FORM_INFO } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller } from "react-hook-form";

interface SurveyStep5Props {
  handleChange: () => void;
  control: Control<SurveyStepValues>;
  petName: string;
}

export default function SurveyStep5({
  control,
  handleChange,
  petName,
}: SurveyStep5Props) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  return (
    <Controller
      name="step5.birth"
      control={control}
      render={({ field }) => {

        // field.value가 완전한 값(길이가 6)일 때에만 동기화합니다.
        useEffect(() => {
          const combined = field.value || "";
          if (combined.length === 6) {
            setYear(combined.slice(0, 4));
            setMonth(combined.slice(4, 6));
          }
        }, [field.value]);

        const title = SURVEY_FORM_INFO.birth.title;
        const fullTitle = petName
          ? getNameWithPossessiveSuffix2(petName, title)
          : title;

        // 연도와 월을 합쳐서 Controller의 값을 업데이트하는 함수
        const updateCombined = (newYear: string, newMonth: string) => {
          const newCombined = newYear + newMonth;
          field.onChange(newCombined);
          handleChange(); // 추가 검증 및 자동 다음 스텝 체크
        };

        const onYearSelect = (selectedYear: string) => {
          setYear(selectedYear);
          updateCombined(selectedYear, month);
        };

        const onMonthSelect = (selectedMonth: string) => {
          setMonth(selectedMonth);
          updateCombined(year, selectedMonth);
        };

        return (
          <div className={surveyInputWrapper}>
            <h2 className={surveyTitle}>{fullTitle}</h2>
            <div className={styles.birthContainer}>
              <SelectBox
                options={SURVEY_FORM_INFO.birth.years}
                placeholder="년도"
                onSelect={onYearSelect}
                selectedValue={year || ""}
              />
              <SelectBox
                options={SURVEY_FORM_INFO.birth.months}
                placeholder="월"
                onSelect={onMonthSelect}
                selectedValue={month || ""}
              />
            </div>
          </div>
        );
      }}
    />
  );
}