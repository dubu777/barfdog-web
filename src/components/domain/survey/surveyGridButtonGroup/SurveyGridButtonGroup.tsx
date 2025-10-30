import React from "react";
import * as styles from "./SurveyGridButtonGroup.css"; // 필요에 따라 스타일 작성
import { surveyButtonWrapper } from "../../../pages/dietAnalysis/survey/steps/StepElements.css";
import Text from "@/components/ui/text/Text";
import InfoBox from "@/components/ui/infoBox/InfoBox";

interface SurveyGridButtonGroupProps {
  children: React.ReactNode;
  infoBoxText?: string;
}

export default function SurveyGridButtonGroup({
  children,
  infoBoxText,
}: SurveyGridButtonGroupProps) {
  return (
    <div className={surveyButtonWrapper}>
      <div className={styles.surveyGridButtonContainer}>
        <div className={styles.surveyGridButtonWrapper}>
          <Text type="label2" color="gray500">
            *복수응답가능
          </Text>
          {infoBoxText && (
            <InfoBox text={infoBoxText} type="info" color="red" />
          )}
          <div className={styles.surveyGridButtonLayoutWrapper}>{children}</div>
        </div>
      </div>
    </div>
  );
}
