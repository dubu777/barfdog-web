"use client";


import * as styles from "./SurveySteps.css";
import SelectBox from "../selectBox/SelectBox";
import { surveyInputWrapper, surveyTitle } from "@/app/survey/Survey.css";
import { SURVEY_FORM_INFO } from "@/constants";
import { getNameWithPossessiveSuffix2 } from "@/utils";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller } from "react-hook-form";

interface SurveyStepProps {
  handleChange: () => void;
  control: Control<SurveyStepValues>;
  petName: string;
}

export default function SurveyStep9({
  handleChange,
  control,
  petName,
}: SurveyStepProps) {
  const title = SURVEY_FORM_INFO.walkingCountPerWeek.title;
  const fullTitle = petName ? getNameWithPossessiveSuffix2(petName, title) : title;

  return (
    <div className={surveyInputWrapper}>
      <h2 className={surveyTitle}>{fullTitle}</h2>
      <div className={styles.walkingContainer}>
        <Controller
          name="step9.walkingCountPerWeek"
          control={control}
          render={({ field }) => (
            <SelectBox
              options={SURVEY_FORM_INFO.walkingCountPerWeek.options}
              placeholder={SURVEY_FORM_INFO.walkingCountPerWeek.placeholder}
              frontWord={SURVEY_FORM_INFO.walkingCountPerWeek.frontWord}
              selectedValue={field.value}
              onSelect={(value) => {
                field.onChange(value);
                handleChange();
              }}
            />
          )}
        />
        <Controller
          name="step9.walkingTimePerOneTime"
          control={control}
          render={({ field }) => (
            <SelectBox
              options={SURVEY_FORM_INFO.walkingTimePerOneTime.options}
              placeholder={SURVEY_FORM_INFO.walkingTimePerOneTime.placeholder}
              frontWord={SURVEY_FORM_INFO.walkingTimePerOneTime.frontWord}
              selectedValue={field.value}
              onSelect={(value) => {
                field.onChange(value);
                handleChange();
              }}
            />
          )}
        />
      </div>
    </div>
  );
}