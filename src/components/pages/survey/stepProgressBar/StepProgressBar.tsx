import React from "react";
import * as styles from "./StepProgressBar.css";

interface SurveyActiveStepProps {
  currentStep: number;
}

export const StepProgressBar = ({ currentStep }: SurveyActiveStepProps) => {
  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepLine}></div>
      <div className={styles.stepBox}>
        <div
          className={styles.stepCircle({
            active: currentStep >= 0 && currentStep <= 5,
          })}
        >
          <div
            className={styles.stepNumber({
              active: currentStep >= 0 && currentStep <= 5,
            })}
          >
            1
          </div>
        </div>
        <div className={styles.stepText}>반려견 정보</div>
      </div>
      <div className={styles.stepBox}>
        <div
          className={styles.stepCircle({
            active: currentStep >= 6 && currentStep <= 14,
          })}
        >
          <div
            className={styles.stepNumber({
              active: currentStep >= 6 && currentStep <= 14,
            })}
          >
            2
          </div>
        </div>
        <div className={styles.stepText}>반려견 건강</div>
      </div>
      <div className={styles.stepBox}>
        <div
          className={styles.stepCircle({
            active: currentStep >= 15 && currentStep <= 16,
          })}
        >
          <div
            className={styles.stepNumber({
              active: currentStep >= 15 && currentStep <= 16,
            })}
          >
            3
          </div>
        </div>
        <div className={styles.stepText}>추가 사항</div>
      </div>
    </div>
  );
};
