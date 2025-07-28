import { ComponentType, SVGProps } from "react";

/** 성별 */
type Gender = "MALE" | "FEMALE";

/** 견사이즈 */
type DogSize = "SMALL" | "MEDIUM" | "LARGE";

/** 활동량 */
type ActivityLevel = "VERY_HIGH" | "HIGH" | "NORMAL" | "LOW" | "VERY_LOW";

/** 체형(BCS) */
type BodyFit = "VERY_THIN" | "THIN" | "NORMAL" | "FAT" | "VERY_FAT";

/** 임신 단계 */
type PregnancyStatus = "NONE" | "EARLY" | "LATE";

/** 수유 상태 */
type LactationStatus =
  | "NONE"
  | "LACTATION_ONE"
  | "LACTATION_THREE"
  | "LACTATION_FIVE"
  | "LACTATION_SEVEN";

/** 간식 섭취량 */
type SnackCountLevel = "LITTLE" | "NORMAL" | "MUCH";

/** 못 먹는 식재료 */
type InedibleFood =
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
type HealthConcern =
  | "VOMITING_DIARRHEA"
  | "WEIGHT_CONTROL"
  | "ENERGY_BOOST"
  | "TEARS"
  | "SKIN_HAIR"
  | "JOINT_HEALTH"
  | "PUPPY_DEVELOPMENT"
  | "SENIOR_HEALTH";

/** 현재 식단 */
type CurrentMeal =
  | "DRY"
  | "WET"
  | "HOMEMADE"
  | "FREEZE_DRIED"
  | "COOKED"
  | "RAW";

/** 영양제 */
type Supplements =
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
type HealthIssue =
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

type RecipeEfficacy =
  | "부드러운 소화"
  | "균형 잡힌 체형"
  | "빠른 기력 회복"
  | "눈가 청결 유지"
  | "윤기나는 모질"
  | "관절 기능 강화"
  | "튼튼한 성장"
  | "활기찬 노후";

/** 설문 제출‧결과 공통 인터페이스 */
interface DietAnalysisPayload {
  name: string;
  gender: Gender;
  birthDay: string;
  oldDog: boolean;
  dogType: string;
  dogSize: DogSize;
  weight: string; // '5.2'처럼 문자열로 받되 필요 시 number 변환
  neutralization: boolean;
  activityLevel: ActivityLevel;
  bodyCondition: BodyFit;
  pregnancy: PregnancyStatus;
  lactation: LactationStatus;
  snackCountLevel: SnackCountLevel;
  inedibleFood: InedibleFood[];
  healthConcerns: HealthConcern[];
  currentMeal: CurrentMeal[];
  supplements: Supplements[];
  healthIssues: HealthIssue[];
}

// 추천 식단 설문 결과지
interface DietAnalysisResult {
  subscribeId: number;
  subscribeStatus: string;
  recommendRecipeExist: boolean;
  firstResultResponse: FirstResultResponse;
  secondResultResponse: SecondResultResponse;
  thirdResultResponse: ThirdResultResponse;
}

interface FirstResultResponse {
  firstHealthConcernsSymptomsList: string[];
  healthConcernsOtherSymptomsList: string[];
  activityLevel: ActivityLevel;
  snackCountLevel: SnackCountLevel;
  inedibleFoodType: InedibleFood[];
}

interface SecondResultResponse {
  dogId: number;
  dogName: string;
  firstHealthConcerns: HealthConcern;
  firstHealthConcernsCauseList: string[];
  recipeEfficacyList: string[];
}

interface ThirdResultResponse {
  recommendRecipeRankDtoList: RecommendRecipeRankDto[];
  oneDayRecommendKcal: number;
}

interface RecommendRecipeRankDto {
  rank: number;
  recommendRecipeId: number;
  recommendRecipeName: string;
  recommendRecipeDescription: string;
  recommendRecipeImgUrl: string;
  ingredientsList: InedibleFood[];
  uiNameKorean: string;
  uiNameEnglish: string;
}

interface CreateDietAnalysisResultResponse {
  surveyReportId: number;
}

interface EfficacyData {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  symptom: string;
}

export type {
  DietAnalysisPayload,
  DietAnalysisResult,
  CreateDietAnalysisResultResponse,
  FirstResultResponse,
  SecondResultResponse,
  ThirdResultResponse,
  ActivityLevel,
  SnackCountLevel,
  InedibleFood,
  RecipeEfficacy,
  RecommendRecipeRankDto,
  EfficacyData,
};
