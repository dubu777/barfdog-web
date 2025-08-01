import { ComponentType, SVGProps } from "react";
import { SubscribeStatus } from "./subscription";

/** 성별 */
type Gender = "MALE" | "FEMALE";

/** 견사이즈 */
type DogSize = "SMALL" | "MEDDLE" | "LARGE";

type GeneralLevel = "VERY_HIGH" | "HIGH" | "NORMAL" | "LOW" | "VERY_LOW";

type SnackCountLevel = "HIGH" | "NORMAL" | "LOW";

/** 체형(BCS) */
type BodyFit = "VERY_THIN" | "THIN" | "NORMAL" | "FAT" | "VERY_FAT";

type PregnancyStatus = "NONE" | "PREGNANCY_EARLY" | "PREGNANCY_LATE";

type LactationStatus =
  | "NONE"
  | "LACTATION_1_TO_2"
  | "LACTATION_3_TO_4"
  | "LACTATION_5_TO_6"
  | "LACTATION_7_OR_MORE";

/** 설문 제출‧결과 공통 인터페이스 */
interface DietAnalysisPayload {
  dogId: number;
  name: string;
  gender: Gender;
  birthDay: string;
  oldDog: boolean;
  dogType: string;
  dogSize: DogSize;
  weight: string; // '5.2'처럼 문자열로 받되 필요 시 number 변환
  neutralization: boolean;
  activityLevel: GeneralLevel;
  bodyCondition: BodyFit;
  pregnancy: PregnancyStatus;
  lactation: LactationStatus;
  snackCountLevel: SnackCountLevel;
  inedibleFoods: string[];
  healthConcerns: string[];
  currentMeals: string[];
  supplements: string[];
  healthIssues: string[];
}

interface DietAnalysisFormValues {
  step1: Pick<DietAnalysisPayload, "name" | "gender" | "neutralization">;
  step2: { birthDay: string; oldDog: boolean };
  step3: Pick<DietAnalysisPayload, "dogSize" | "weight">;
  step4: Pick<DietAnalysisPayload, "dogType">;
  step5: Pick<DietAnalysisPayload, "pregnancy">;
  step6: Pick<DietAnalysisPayload, "lactation">;
  step7: Pick<DietAnalysisPayload, "bodyCondition">;
  step8: Pick<DietAnalysisPayload, "activityLevel">;
  step9: Pick<DietAnalysisPayload, "snackCountLevel">;
  step10: Pick<DietAnalysisPayload, "inedibleFoods">;
  step11: Pick<DietAnalysisPayload, "healthConcerns">;
  step12: Pick<DietAnalysisPayload, "currentMeals">;
  step13: Pick<DietAnalysisPayload, "supplements">;
  step14: Pick<DietAnalysisPayload, "healthIssues">;
}

// 추천 식단 설문 결과지
interface DietAnalysisResult {
  surveyReportId: number;
  subscribeId: number;
  subscribeStatus: SubscribeStatus;
  recommendRecipeExist: boolean;
  firstResultResponse: FirstResultResponse;
  secondResultResponse: SecondResultResponse;
  thirdResultResponse: ThirdResultResponse;
}

interface FirstResultResponse {
  firstHealthConcernSymptomList: string[];
  healthConcernOtherSymptomList: string[];
  activityLevel: GeneralLevel;
  snackCountLevel: SnackCountLevel;
  foodAllergyTypes: string[];
  surveyReportCreatedDate: string[];
  surveyReportModifiedDate: string[];
}

interface SecondResultResponse {
  dogId: number;
  dogName: string;
  firstHealthConcerns: string;
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
  healthImprovements: HealthImprovements[];
  recommendRecipeImgUrl: string;
  foodAllergies: string[];
  primaryIngredientList: string[];
  healthConcernsList: string[];
  uiNameKorean: string;
  uiNameEnglish: string;
}

interface HealthImprovements {
  healthConcernsExplanationTitle: string;
  healthConcernsExplanation: string;
}

interface CreateDietAnalysisResultResponse {
  success: boolean;
  data: null | number;
  message: null | string;
  detailMessage: null | string;
  errorCode: null | string;
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
  SnackCountLevel,
  RecommendRecipeRankDto,
  EfficacyData,
  DietAnalysisFormValues,
  GeneralLevel,
};
