// utils/scoreUtils.ts

import { DiseaseName, DiseasePhase } from "@/types/healthNote";

/**
 * 1) 증상 단계 타입: 초기, 중기, 심화
 */

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
  phaseDescriptions: Record<DiseasePhase, string>;
  healthGuide: string;
}

/**
 * 4) 통합된 DISEASE_INFO: 영어 키 → DiseaseMeta 객체
 *    • 한 곳에 모든 정보를 모아두면, 유틸 함수가 이 객체만 참조하면 됩니다.
 */
export const DISEASE_INFO: Record<DiseaseName, DiseaseMeta> = {
  hemorrhagicEnterocolitis: {
    koreanName: "출혈성 장염",
    scoreDescription:
      "장내 출혈과 염증으로 인해 변 색 변화와 구토가 동반되는 질환",
    maxScore: 64,
    phaseDescriptions: {
      초기: "장내에 경미한 출혈과 설사가 동반되며, 대변 색이 약간 어두워지기 시작합니다.",
      중기: "빈번한 혈변과 복통 증상이 나타나며, 구토와 전반적인 컨디션 저하가 동반됩니다.",
      심화: "지속적인 출혈과 심한 구토가 발생하고, 탈수·빈혈·전신 쇠약이 나타날 수 있습니다.",
    },
    healthGuide:
      "장내 출혈과 염증이 빠르게 진행되는 출혈성 장염은 초기에 대처가 중요해요. 갑작스러운 식욕 저하나 혈변이 보인다면 식단부터 살펴보고 휴식을 충분히 줄 수 있는 환경을 마련해 주세요. 자극을 줄이는 것만으로도 불편한 증상이 더 빨리 가라앉아요.",
  },

  gastricUlcer: {
    koreanName: "위궤양",
    scoreDescription:
      "위 점막이 손상되어 식욕 저하, 구토, 복통이 나타나는 질환",
    maxScore: 48,
    phaseDescriptions: {
      초기: "속쓰림이나 가벼운 상복부 통증이 나타나며, 식사 후 불편감이 간헐적으로 발생합니다.",
      중기: "식욕 저하와 구토 증상이 동반되며, 체중 감소와 복통이 빈번해집니다.",
      심화: "위궤양 부위에서 출혈이 발생하고, 심한 복통·구토, 빈혈 위험이 증가합니다.",
    },
    healthGuide:
      "위궤양은 방치하면 빠르게 악화될 수 있지만, 초기부터 위에 부담을 덜어주는 식사와 안정적인 환경을 만들어준다면 충분히 회복할 수 있어요. 자극적인 금식이나 과도한 스트레스만 줄여줘도 훨씬 좋아집니다.",
  },

  enteritis: {
    koreanName: "장염",
    scoreDescription:
      "장의 염증으로 인해 설사, 구토, 복부 불편감이 나타나는 질환",
    maxScore: 72,
    phaseDescriptions: {
      초기: "경미한 설사와 복부 불편감이 동반되며, 가벼운 발열이 있을 수 있습니다.",
      중기: "설사 횟수가 증가하고, 발열·혈변·복부 경련이 나타나며 전반적인 컨디션 저하가 옵니다.",
      심화: "심한 탈수와 빈번한 혈변, 급성 복통이 지속되고, 빠른 치료가 필요합니다.",
    },
    healthGuide:
      "장염은 잠시 장을 쉬게 해주는 식단과 충분한 수분 섭취만으로도 회복에 큰 도움이 돼요. 낯선 간식이나 사람이 먹는 음식은 피하고 아이가 편안하게 쉴 수 있는 환경을 만들어 주세요. 장 속 균형을 도와주는 유산균이나 저자극 식이섬유도 빠른 회복에 도움이 돼요.",
  },

  ibs: {
    koreanName: "IBS(과민성 대장 증후군)",
    scoreDescription:
      "스트레스나 식습관에 의해 장이 과민하게 반응하는 기능성 질환",
    maxScore: 40,
    phaseDescriptions: {
      초기: "간헐적인 복부 팽만감과 가벼운 변비 또는 설사 증상이 나타납니다.",
      중기: "지속적인 장 불편감이 있으며, 스트레스나 특정 음식에 의해 증상이 악화됩니다.",
      심화: "심한 복부 경련과 배변 곤란이 반복되며, 심리적 불안·피로감이 동반될 수 있습니다.",
    },
    healthGuide:
      "장이 아주 예민한 상태라 자극보다 안정이 가장 중요해요. 식사와 산책 시간을 일정하게 유지하고, 스트레스를 줄일 수 있는 조용한 공간을 마련해 주세요. 사람 음식이나 기름진 간식보다는 소화에 좋은 식사와 장내 균형을 위한 유산균 급여가 큰 도움이 돼요.",
  },

  lifestyle: {
    koreanName: "생활습관",
    scoreDescription:
      "식사, 간식, 유산균 섭취 등 장 건강에 영향을 주는 생활 요소",
    maxScore: 20,
    phaseDescriptions: {
      초기: "",
      중기: "",
      심화: "",
    },
    healthGuide: "",
  },
};

/**
 * 5) Chips 컴포넌트에 사용할 color 타입 정의
 */
export type ChipColor = "blue500" | "green500" | "yellow500" | "red";

/**
 * 6) 상태 레이블 상수(백분율 구간별)
 */
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
  const meta = DISEASE_INFO[diseaseName];
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
  return DISEASE_INFO[diseaseName];
}

/**
 * 10) 특정 질병의 특정 단계(초기·중기·심화) 설명을 꺼내오는 단축 함수
 */
export function getPhaseDescription(
  diseaseName: DiseaseName,
  phase: DiseasePhase
): string {
  const disease = DISEASE_INFO[diseaseName];
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
