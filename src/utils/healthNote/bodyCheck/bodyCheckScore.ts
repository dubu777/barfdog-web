import { DiseaseCategoryKey, DiseasePhaseType } from "@/types/healthNote/bodyCheck";
import { BODY_CHECK_DISEASE_INFO } from "@/constants/healthNote/bodyCheck/common";

export interface DiseaseMeta {
  name: string;
  scoreDescription: string;
  maxScore: number;
  phaseDescriptions: Record<DiseasePhaseType, string>;
  healthGuide: string;
}

export type ChipColor = "blue500" | "green500" | "yellow500" | "red";

export const HEALTH_LABEL = "건강";
export const GOOD_LABEL = "양호";
export const CAUTION_LABEL = "주의";
export const DANGER_LABEL = "위험";

// 백분율(percentage) 구간에 따라 label과 color를 결정하기 위한 배열
const THRESHOLD_LIST: Array<{
  minPercentage: number;
  label: string;
  color: ChipColor;
}> = [
  { minPercentage: 90, label: HEALTH_LABEL, color: "blue500" },
  { minPercentage: 70, label: GOOD_LABEL, color: "green500" },
  { minPercentage: 40, label: CAUTION_LABEL, color: "yellow500" },
  { minPercentage: 0, label: DANGER_LABEL, color: "red" },
];

 // 점수 상태(percentage, label, color)를 계산해 주는 함수
export interface ScoreStatus {
  maxScore: number; // 해당 질병의 만점
  percentage: number; // 0 ~ 100으로 클램핑된 백분율
  label: string; // HEALTH_LABEL, GOOD_LABEL 등
  color: ChipColor; // blue500, green500, yellow500, red 중 하나
}

export function getBodyCheckScoreStatus(
  diseaseName: DiseaseCategoryKey,
  rawScore: number
): ScoreStatus {
  const meta = BODY_CHECK_DISEASE_INFO[diseaseName];
  const maxScore = meta?.max ?? 0;

  // 백분율 계산 (0~100 범위로 클램핑)
  const percentage =
    maxScore > 0 ? Math.min(Math.max((rawScore / maxScore) * 100, 0), 100) : 0;

  // THRESHOLD_LIST에서 percentage >= minPercentage인 첫 번째 항목을 찾음
  const matched = THRESHOLD_LIST.find(
    (item) => percentage >= item.minPercentage
  )!;

  return {
    maxScore,
    percentage,
    label: matched.label,
    color: matched.color,
  };
}

 // 특정 질병의 특정 단계(초기·중기·심화) 설명을 꺼내오는 단축 함수
export function getPhaseDescription(
  diseaseName: DiseaseCategoryKey,
  phase: DiseasePhaseType
): string {
  const disease = BODY_CHECK_DISEASE_INFO[diseaseName];
  if (!disease) {
    console.warn(
      `[getPhaseDescription] 등록되지 않은 diseaseName: ${diseaseName}`
    );
    return "";
  }
  const text = disease.phaseDescriptions?.[phase];
  if (!text) {
    console.warn(
      `[getPhaseDescription] "${diseaseName}"에 등록되지 않은 phase: ${phase}`
    );
    return "";
  }
  return text;
}
