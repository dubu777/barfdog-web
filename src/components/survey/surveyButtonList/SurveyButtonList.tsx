import React from "react";
import * as styles from "./SurveyButtonList.css";
import { surveyTitle } from "@/app/survey/Survey.css";
import { getPetNameWithSuffix } from "@/utils";
import SurveyButton from "../surveyButton/SurveyButton";

interface RadioButtonListProps {
  options: readonly {
    id: string;
    value: string | boolean | number;
    label: string;
    subText?: readonly string[];
  }[];
  name: string;
  selectedValue: string | boolean | number | (string | number | boolean)[] | null;
  onChange: (value: string | number | boolean | (string | number | boolean)[]) => void;
  title: string;
  petName: string;
  layoutType?: "row" | "col" | "grid";
  selectionType?: "single" | "multiple"; // 선택 타입 추가 (단일 또는 다중 선택)
}

export default function SurveyButtonList({
  options,
  name,
  selectedValue,
  onChange,
  layoutType = "col",
  title,
  petName,
  selectionType = "single",
}: RadioButtonListProps) {
  const fullTitle = getPetNameWithSuffix(petName, title);
  
  // type(single, multipe)에 따른 선택 로직
  const handleChange = (value: string | boolean | number) => {
    if (selectionType === "multiple") {
      const selectedArray = Array.isArray(selectedValue) ? selectedValue : [];
      if (selectedArray.includes(value)) {
        const newSelection = selectedArray.filter((v) => v !== value);
        onChange(newSelection);
      } else {
        onChange([...selectedArray, value]);
      }
    } else {
      onChange(value);
    }
  };

  return (
    <div className={styles.surveyButtonListContainer}>
      {title && <h2 className={surveyTitle}>{fullTitle}</h2>}
      <div className={styles.surveyButtonListWrapper({ type: layoutType })}>
      {options.map((option) => (
        <SurveyButton
          key={option.id}
          id={option.id}
          name={name}
          value={option.value}
          isChecked={
            selectionType === "multiple"
              ? Array.isArray(selectedValue) && selectedValue.includes(option.value)
              : selectedValue === option.value
          }
          label={option.label}
          layoutType={layoutType}
          onChange={handleChange}
        />
      ))}
      </div>
    </div>
  );
}
