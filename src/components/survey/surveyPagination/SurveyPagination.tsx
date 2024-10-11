"use client";

import useStep from "@/hooks/useStep";
import * as styles from './SurveyPagination.css';

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
        {!isFirstStep && <button className={styles.prevButton} onClick={handlePrevStep}>이전</button>}
        {!isLastStep ? (
          <button className={styles.nextButton} onClick={handleNextStep}>다음</button>
        ) : (
          <button>제출</button>
        )}
      </footer>
  );
}