import React from "react";
import * as styles from "./SurveyProgressBar.css";
import { SurveySection } from "@/types";

interface SurveyProgressBarProps {
  currentStep: number;
  sections: SurveySection[];
}

/**
 * 각 섹션에서 로컬 진행 단계를 계산합니다.
 * @param currentStep 전체 진행 단계
 * @param cumulative 이전 섹션의 총 단계 수
 * @param sectionSteps 해당 섹션의 단계 수
 * @returns 해당 섹션 내의 진행 단계 (0 ~ sectionSteps)
 */
function getLocalStep(currentStep: number, cumulative: number, sectionSteps: number): number {
  const local = currentStep - cumulative;
  if (local < 0) return 0;
  if (local > sectionSteps) return sectionSteps;
  return local;
}

const SurveyProgressBar: React.FC<SurveyProgressBarProps> = ({ currentStep, sections }) => {
  // 각 섹션은 동일한 너비로 표시 (예: 3섹션이면 100/3 = 33.33%씩)
  const sectionWidthPercent = 100 / sections.length;

  let cumulativeSteps = 0; // 지금까지 누적된 단계 수

  return (
    <div className={styles.progressBarBackground}>
    <div className={styles.progressBarContainer}>
      {sections.map((section) => {
        const localStep = getLocalStep(currentStep, cumulativeSteps, section.steps);
        const filledPercent = (localStep / section.steps) * 100;
        cumulativeSteps += section.steps;

        return (
          <div
            key={section.key}
            className={styles.progressSection}
            style={{ width: `${sectionWidthPercent}%` }}
          >
            <div
              className={styles.progressSectionFill}
              style={{ width: `${filledPercent}%` }}
            />
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default SurveyProgressBar;
