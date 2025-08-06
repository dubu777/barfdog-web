import { BODY_DISEASE_INFO } from "@/constants/healthNote/bodyCheck/result";
import { DiseaseName, DiseasePhaseType } from "@/types/healthNote";

/**
 * 3) 각 질병의 메타 정보 + 단계별 설명 + 헬스 가이드를 모두 담는 인터페이스
 *
 *    - koreanName: 화면에 표시할 한글명
 *    - scoreDescription: (간단 설명) 질병을 한 줄로 요약한 텍스트
 *    - maxScore: 해당 질병의 총점 (유저가 받는 raw score의 만점)
 *    - phaseDescriptions: 단계별(초기·중기·심화) 상세 설명
 *    - healthGuide: 질병 관리 및 예방을 위한 구체적인 가이드 텍스트
 */
export interface DiseaseMeta {
  koreanName: string;
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

/**
 * 7) 백분율(percentage) 구간에 따라 label과 color를 결정하기 위한 배열
 */
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

/**
 * 8) 점수 상태(percentage, label, color)를 계산해 주는 함수
 *    • rawScore: 사용자가 실제 획득한 점수
 *    • diseaseName: 영어 키
 */
export interface ScoreStatus {
  maxScore: number; // 해당 질병의 만점
  percentage: number; // 0 ~ 100으로 클램핑된 백분율
  label: string; // HEALTH_LABEL, GOOD_LABEL 등
  color: ChipColor; // blue500, green500, yellow500, red 중 하나
}

export function getBodyCheckScoreStatus(
  diseaseName: DiseaseName,
  rawScore: number
): ScoreStatus {
  const meta = BODY_DISEASE_INFO[diseaseName];
  const maxScore = meta?.maxScore ?? 0;

  // 백분율 계산 (0~100 범위로 클램핑)
  const percentage =
    maxScore > 0 ? Math.min(Math.max((rawScore / maxScore) * 100, 0), 100) : 0;

  // THRESHOLD_LIST에서 percentage >= minPercentage인 첫 번째 항목을 찾는다.
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

/**
 * 9) 영어 키 하나만 넘겨주면, 한글명·간단 설명·만점·단계별 설명·헬스 가이드를 한꺼번에 꺼낼 수 있는 함수
 */
export function getBodyCheckDiseaseMeta(diseaseName: DiseaseName): DiseaseMeta {
  return BODY_DISEASE_INFO[diseaseName];
}

/**
 * 10) 특정 질병의 특정 단계(초기·중기·심화) 설명을 꺼내오는 단축 함수
 */
export function getPhaseDescription(
  diseaseName: DiseaseName,
  phase: DiseasePhaseType
): string {
  const disease = BODY_DISEASE_INFO[diseaseName];
  if (!disease) {
    console.warn(
      `[getPhaseDescription] 등록되지 않은 diseaseName: ${diseaseName}`
    );
    return "";
  }
  const text = disease.phaseDescriptions[phase];
  if (!text) {
    console.warn(
      `[getPhaseDescription] "${diseaseName}"에 등록되지 않은 phase: ${phase}`
    );
    return "";
  }
  return text;
}
