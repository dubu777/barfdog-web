"use client";

import * as styles from "./SurveyPagination.css";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";

interface SurveyPaginationProps {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  currentStep: number;
  stepLength: number;
}

export default function SurveyPagination({
  handleNextStep,
  handlePrevStep,
  isLastStep,
  isFirstStep,
  currentStep,
  stepLength,
}: SurveyPaginationProps) {
  const progressPercentage = ((currentStep + 1) / stepLength) * 100;


  return (
    <footer className={styles.surveyPaginationContainer}>
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className={styles.surveyPaginationButtonWrapper}>
        <DefaultButton
          onClick={handlePrevStep}
          size="xl"
          type="mainBorder"
          borderRadius="lg"
          isHidden={isFirstStep}
        >
          이전
        </DefaultButton>
        {!isLastStep ? (
          <DefaultButton
            onClick={handleNextStep}
            type="main"
            size="xxl"
            borderRadius="lg"
          >
            다음
          </DefaultButton>
        ) : (
          <DefaultButton
            onClick={() => {}}
            type="black"
            size="xxl"
            borderRadius="lg"
          >
            제출
          </DefaultButton>
        )}
      </div>
    </footer>
  );
}
