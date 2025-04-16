"use client";

import * as styles from "./SurveyPagination.css";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface SurveyPaginationProps {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  canNextStep: boolean;
}

export default function SurveyPagination({
  handleNextStep,
  handlePrevStep,
  isLastStep,
  isFirstStep,
  canNextStep,
}: SurveyPaginationProps) {

  // 결과 레시피 추천 페이지 테스트 이동 용
  const router = useRouter();
  const handleResultPageTest = () => {
    const id = 3709;
    router.push(`/survey/result?id=${id}`)
  }
  return (
    <footer className={styles.surveyPaginationContainer}>
      <div className={styles.surveyPaginationButtonWrapper}>
        <DefaultButton
          onClick={handlePrevStep}
          size="lg"
          type="mainBorder"
          borderRadius="lg"
          isHidden={isFirstStep}
        >
          <Image
            src={"/images/icons/left-arrow-red.svg"}
            width={18}
            height={18}
            alt="left arrow"
          />
          {/* <LeftArrowIcon /> */}
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
            {/* <RightArrowIcon/> */}
            <Image
            src={"/images/icons/right-arrow-white.svg"}
            width={18}
            height={18}
            alt="right arrow"
            />
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
