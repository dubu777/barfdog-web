"use client";

import { SurveyFormData } from "@/types/survey";
import * as styles from "./SurveySteps.css";
import SelectBox from "../selectBox/SelectBox";
import { surveyInputWrapper, surveyTitle } from "@/app/survey/Survey.css";
import { SURVEY_FORM_INFO } from "@/constants";
import { getNameWithPossessiveSuffix2 } from "@/utils";

interface SurveyStep2Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K]
  ) => void;
}

export default function SurveyStep9({
  formData,
  handleChange,
}: SurveyStep2Props) {

  const title = SURVEY_FORM_INFO.walkingCountPerWeek.title
  const petName = formData.name
  const fullTitle = title && petName
  ? getNameWithPossessiveSuffix2(petName, title) 
  : title;

  return (
    <div className={surveyInputWrapper}>
      <h2 className={surveyTitle}>{fullTitle}</h2>
      <div className={styles.walkingContainer}>
        <SelectBox
          options={SURVEY_FORM_INFO.walkingCountPerWeek.options}
          placeholder={SURVEY_FORM_INFO.walkingCountPerWeek.placeholder}
          frontWord={SURVEY_FORM_INFO.walkingCountPerWeek.frontWord}
          selectedValue={formData.walkingCountPerWeek}
          onSelect={(value) =>
            handleChange(
              SURVEY_FORM_INFO.walkingCountPerWeek.id,
              value as string
            )
          }
        />
        <SelectBox
          options={SURVEY_FORM_INFO.walkingTimePerOneTime.options}
          placeholder={SURVEY_FORM_INFO.walkingTimePerOneTime.placeholder}
          frontWord={SURVEY_FORM_INFO.walkingTimePerOneTime.frontWord}
          selectedValue={formData.walkingTimePerOneTime}
          onSelect={(value) =>
            handleChange(
              SURVEY_FORM_INFO.walkingTimePerOneTime.id,
              value as string
            )
          }
        />
      </div>
    </div>
  );
}
