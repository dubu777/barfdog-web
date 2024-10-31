"use client";

import { SurveyFormData } from "@/types/survey";
import * as styles from "../surveySteps/SurveySteps.css";
import SelectBox from "../selectBox/SelectBox";
import { surveyInputWrapper, surveyTitle } from "@/app/survey/Survey.css";
import { HEALTH_INFO } from "@/constants";
import { getPetNameWithSuffix } from "@/utils";

interface SurveyStep2Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K]
  ) => void;
  fieldOptions: 
}

export default function SurveyStep9({
  formData,
  handleChange,
}: SurveyStep2Props) {

  const title = HEALTH_INFO.walkingCountPerWeek.title
  const petName = formData.name
  const fullTitle = title && petName
  ? getPetNameWithSuffix(petName, title) 
  : title;

  return (
    <div className={surveyInputWrapper}>
      <h2 className={surveyTitle}>{fullTitle}</h2>
      <div className={styles.walkingContainer}>
        <SelectBox
          id={HEALTH_INFO.walkingCountPerWeek.id}
          options={HEALTH_INFO.walkingCountPerWeek.options}
          placeholder={HEALTH_INFO.walkingCountPerWeek.placeholder}
          frontWord={HEALTH_INFO.walkingCountPerWeek.frontWord}
          selectedValue={formData.walkingCountPerWeek}
          onSelect={(value) =>
            handleChange(
              HEALTH_INFO.walkingCountPerWeek.name,
              value as string
            )
          }
        />
        <SelectBox
          id={HEALTH_INFO.walkingTimePerOneTime.id}
          options={HEALTH_INFO.walkingTimePerOneTime.options}
          placeholder={HEALTH_INFO.walkingTimePerOneTime.placeholder}
          frontWord={HEALTH_INFO.walkingTimePerOneTime.frontWord}
          selectedValue={formData.walkingTimePerOneTime}
          onSelect={(value) =>
            handleChange(
              HEALTH_INFO.walkingTimePerOneTime.name,
              value as string
            )
          }
        />
      </div>
    </div>
  );
}
