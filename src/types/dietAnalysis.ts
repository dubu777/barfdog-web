import { ComponentType, SVGProps } from "react";
import { SubscribeStatus } from "./subscription";
import {
  BodyFit,
  DogSize,
  Gender,
  GeneralLevel,
  HealthConcernType,
  LactationStatus,
  PregnancyStatus,
  SnackCountLevel,
} from "./survey";

/** 설문 제출‧결과 공통 인터페이스 */
interface DietAnalysisPayload {
  dogId: number;
  oldDog: boolean;
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
  step1: Pick<DietAnalysisPayload, "neutralization">;
  step2: { oldDog: boolean };
  step3: Pick<DietAnalysisPayload, "dogSize" | "weight">;
  step4: Pick<DietAnalysisPayload, "pregnancy">;
  step5: Pick<DietAnalysisPayload, "lactation">;
  step6: Pick<DietAnalysisPayload, "bodyCondition">;
  step7: Pick<DietAnalysisPayload, "activityLevel">;
  step8: Pick<DietAnalysisPayload, "snackCountLevel">;
  step9: Pick<DietAnalysisPayload, "inedibleFoods">;
  step10: Pick<DietAnalysisPayload, "healthConcerns">;
  step11: Pick<DietAnalysisPayload, "currentMeals">;
  step12: Pick<DietAnalysisPayload, "supplements">;
  step13: Pick<DietAnalysisPayload, "healthIssues">;
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
  firstHealthConcerns: HealthConcernType;
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
  primaryIngredients: string[];
  healthConcernsList: HealthConcernType[];
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
  RecommendRecipeRankDto,
  EfficacyData,
  DietAnalysisFormValues,
};
