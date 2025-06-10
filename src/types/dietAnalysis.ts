/** 성별 */
export type Gender = "MALE" | "FEMALE";

/** 견사이즈 */
export type DogSize = "SMALL" | "MEDIUM" | "LARGE";

/** 활동량 */
export type ActivityLevel =
  | "VERY_MUCH"
  | "MUCH"
  | "NORMAL"
  | "LITTLE"
  | "VERY_LITTLE";

/** 체형(BCS) */
export type DogBodyCondition =
  | "VERY_THIN"
  | "THIN"
  | "NORMAL"
  | "OVERWEIGHT"
  | "OBESE";

/** 임신 단계 */
export type PregnancyStatus = "NONE" | "EARLY" | "LATE";

/** 수유 상태 */
export type LactationStatus =
  | "NONE"
  | "LACTATION_ONE"
  | "LACTATION_THREE"
  | "LACTATION_FIVE"
  | "LACTATION_SEVEN";

/** 간식 섭취량 */
export type SnackCountLevel = "LITTLE" | "NORMAL" | "MUCH";

/** 못 먹는 식재료 */
export type InedibleFood =
  | "NONE"
  | "CHICKEN"
  | "TURKEY"
  | "DUCK"
  | "LAMB"
  | "COW"
  | "KANGAROO"
  | "GOAT"
  | "QUAIL"
  | "HEART";

/** 주요 건강 고민 */
export type HealthConcern =
  | "VOMITING_DIARRHEA"
  | "WEIGHT_CONTROL"
  | "ENERGY_BOOST"
  | "TEARS"
  | "SKIN_HAIR"
  | "JOINT_HEALTH"
  | "PUPPY_DEVELOPMENT"
  | "SENIOR_HEALTH";

/** 현재 식단 */
export type CurrentMeal =
  | "DRY"
  | "WET"
  | "HOMEMADE"
  | "FREEZE_DRIED"
  | "COOKED"
  | "RAW";

/** 영양제 */
export type Supplements =
  | "NONE"
  | "PROBIOTICS"
  | "OMEGA_3"
  | "ANTIOXIDANT"
  | "JOINT"
  | "EYE"
  | "SKIN"
  | "IMMUNITY"
  | "HEART"
  | "TEETH"
  | "BRONCHUS"
  | "GENERAL";

/** 기저 질환 */
export type HealthIssue =
  | "NONE"
  | "HYPERLIPIDEMIA"
  | "PANCREATIC"
  | "HEART"
  | "KIDNEY"
  | "DERMATITIS"
  | "CHOLELITHIASIS"
  | "LIVER_DISEASE"
  | "DIABETES"
  | "EAR_INFLAMMATION"
  | "TEARS";

/** 설문 제출‧결과 공통 인터페이스 */
export interface DietAnalysisPayload {
  name: string;
  gender: Gender;
  birthDay: string;
  oldDog: boolean;
  dogType: string;
  dogSize: DogSize;
  weight: string; // '5.2'처럼 문자열로 받되 필요 시 number 변환
  neutralization: boolean;
  activityLevel: ActivityLevel;
  dogBodyCondition: DogBodyCondition;
  pregnancy: PregnancyStatus;
  lactation: LactationStatus;
  snackCountLevel: SnackCountLevel;
  inedibleFood: InedibleFood[];
  healthConcerns: HealthConcern[];
  currentMeal: CurrentMeal[];
  supplementss: Supplements[];
  healthIssues: HealthIssue[];
}
