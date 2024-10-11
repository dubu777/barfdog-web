import React from "react";

import { radioButtonListContainer } from "./RadioButtonList.css";
import RadioButton from "../radioButton/RadioButton";
import { surveyTitle } from "@/app/survey/Survey.css";
import { getPetNameWithSuffix } from "@/utils";


interface RadioButtonListProps {
  options: readonly { id: string; value: string | boolean | number; label: string; subText?: readonly string[]; }[];
  name: string;
  selectedValue: string | boolean | number | null;
  onChange: (value: string | boolean | number) => void;
  type?: "row" | "col" | 'grid';
  title: string;
  petName: string;
}

export default function RadioButtonList({
  options,
  name,
  selectedValue,
  onChange,
  type = "col",
  title,
  petName,
}: RadioButtonListProps) {
  const fullTitle = getPetNameWithSuffix(petName, title);
  
  return (
    <div className={radioButtonListContainer({type})}>
      {title && <h2 className={surveyTitle}>{fullTitle}</h2>}
      {options.map((option) => (
        <RadioButton
          key={option.id}
          id={option.id}
          name={name}
          value={option.value}
          isChecked={  name === "caution"
            ? option.value === ""
              ? selectedValue !== "NONE"
              : selectedValue === option.value
            : selectedValue === option.value}
          label={option.label}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
