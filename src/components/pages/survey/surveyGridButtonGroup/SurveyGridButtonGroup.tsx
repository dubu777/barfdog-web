import React from "react";
import * as styles from "./SurveyGridButtonGroup.css"; // 필요에 따라 스타일 작성
import { surveyButtonWrapper } from "../steps/StepElements.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import InfoBox from "@/components/common/infoBox/InfoBox";

interface SurveyGridButtonGroupProps {
  children: React.ReactNode;
}

export default function SurveyGridButtonGroup({
  children,
}: SurveyGridButtonGroupProps) {
  return (
    <div className={surveyButtonWrapper}>
      <div className={styles.surveyGridButtonContainer}>
        <div className={styles.surveyGridButtonWrapper}>
          <DefaultText type="label2" color="gray500">
            *복수응답가능
          </DefaultText>
          <InfoBox
            text="질병에 따라 급여가 불가할 수 있어, 질병이 있는 경우 필수로 체크해 주세요"
            type="info"
            color="red"
          />
          <div className={styles.surveyGridButtonLayoutWrapper}>{children}</div>
        </div>
      </div>
    </div>
  );
}
