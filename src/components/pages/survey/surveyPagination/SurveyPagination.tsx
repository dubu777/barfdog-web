"use client";

import { StepProgressBar } from "../stepProgressBar/StepProgressBar";
import * as styles from "./SurveyPagination.css";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
// import LeftArrowIcon from "/public/images/icons/angle-left-red.svg"
// import RightArrowIcon from "/public/images/icons/angle-right-white.svg"
import RightArrowIcon from "/public/images/icons/right-arrow-white.svg"
import LeftArrowIcon from "/public/images/icons/left-arrow-red.svg"
import { useRouter } from "next/navigation";

interface SurveyPaginationProps {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  currentStep: number;
  stepLength: number;
  canNextStep: boolean;
}

export default function SurveyPagination({
  handleNextStep,
  handlePrevStep,
  isLastStep,
  isFirstStep,
  currentStep,
  stepLength,
  canNextStep,
}: SurveyPaginationProps) {
  const progressPercentage = ((currentStep + 1) / stepLength) * 100;
  
  // 결과 레시피 추천 페이지 테스트 이동 용
  const router = useRouter();
  const handleResultPageTest = () => {
    const id = 3709;
    router.push(`/survey/result?id=${id}`)
  }
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
          size="lg"
          type="mainBorder"
          borderRadius="lg"
          isHidden={isFirstStep}
        >
          <LeftArrowIcon />
          이전
        </DefaultButton>
        {!isLastStep ? (
          <DefaultButton
            onClick={handleNextStep}
            type="main"
            size="lg"
            borderRadius="lg"
            isDisabled={!canNextStep}
          >
            다음
            <RightArrowIcon/>
          </DefaultButton>
        ) : (
          <DefaultButton
            onClick={handleResultPageTest}
            type="black"
            size="lg"
            borderRadius="lg"
            isDisabled={!canNextStep}
          >
            제출
          </DefaultButton>
        )}
      </div>
    </footer>
  );
}
