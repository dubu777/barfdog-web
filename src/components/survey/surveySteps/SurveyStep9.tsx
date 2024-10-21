"use client";

import { SurveyFormData } from "@/types/survey";
import * as styles from "./SurveySteps.css";
import SelectBox from "../selectBox/SelectBox";
import { surveyInputWrapper, surveyTitle } from "@/app/survey/Survey.css";
import { ACTIVITY_INFO } from "@/constants";
import { getPetNameWithSuffix } from "@/utils";

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

  const title = ACTIVITY_INFO.walkingCountPerWeek.title
  const petName = formData.name
  const fullTitle = title && petName
  ? getPetNameWithSuffix(petName, title) 
  : title;

  return (
    <div className={surveyInputWrapper}>
      <h2 className={surveyTitle}>{fullTitle}</h2>
      <div className={styles.walkingContainer}>
        <SelectBox
          id={ACTIVITY_INFO.walkingCountPerWeek.id}
          options={ACTIVITY_INFO.walkingCountPerWeek.options}
          placeholder={ACTIVITY_INFO.walkingCountPerWeek.placeholder}
          frontWord={ACTIVITY_INFO.walkingCountPerWeek.frontWord}
          selectedValue={formData.walkingCountPerWeek}
          onSelect={(value) =>
            handleChange(
              ACTIVITY_INFO.walkingCountPerWeek.name,
              value as string
            )
          }
        />
        <SelectBox
          id={ACTIVITY_INFO.walkingTimePerOneTime.id}
          options={ACTIVITY_INFO.walkingTimePerOneTime.options}
          placeholder={ACTIVITY_INFO.walkingTimePerOneTime.placeholder}
          frontWord={ACTIVITY_INFO.walkingTimePerOneTime.frontWord}
          selectedValue={formData.walkingTimePerOneTime}
          onSelect={(value) =>
            handleChange(
              ACTIVITY_INFO.walkingTimePerOneTime.name,
              value as string
            )
          }
        />
      </div>
    </div>
  );
}
