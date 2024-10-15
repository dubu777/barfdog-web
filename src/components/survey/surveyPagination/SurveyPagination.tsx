"use client";

import useStep from "@/hooks/useStep";
import * as styles from "./SurveyPagination.css";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";

interface SurveyPaginationProps {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
}

export default function SurveyPagination({
  handleNextStep,
  handlePrevStep,
  isLastStep,
  isFirstStep,
}: SurveyPaginationProps) {
  return (
    <footer className={styles.surveyPaginationContainer}>
      <div className={styles.surveyPaginationButtonWrapper}>
      {!isFirstStep && (
        <DefaultButton onClick={handlePrevStep} size="xl" type="mainBorder">
          이전
        </DefaultButton>
      )}
      {!isLastStep ? (
        <DefaultButton onClick={handleNextStep} type="main" size="xl">
          다음
        </DefaultButton>
      ) : (
        <DefaultButton onClick={() => {}} type="black" size="xl">
          제출
        </DefaultButton>
      )}
      </div>
    </footer>
  );
}
