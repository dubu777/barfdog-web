import { fontColors } from "@/components/common/defaultText/DefaultText.css";
import { RecipeDto } from "@/types/recipe";

interface FoodAnalysis {
  oneDayRecommendGram: number;
  oneDayRecommendKcal: number;
  oneMealRecommendGram: number;
}

interface Links {
  query_orderSheet_subscribe: {
    href: string;
  };
  self: {
    href: string;
  };
}

interface RecipeData {
  dogId: number;
  dogName: string;
  foodAnalysis: FoodAnalysis;
  recipeDtoList: RecipeDto[];
  recommendRecipeDescription: string;
  recommendRecipeId: number;
  recommendRecipeImgUrl: string;
  recommendRecipeName: string;
  subscribeId: number;
  subscribeStatus: string;
  uiNameEnglish: string;
  uiNameKorean: string;
  _links: Links;
}

interface ActivityAnalysis {
  avgActivityLevel: string;
  activityGroupOneCount: number;
  activityGroupTwoCount: number;
  activityGroupThreeCount: number;
  activityGroupFourCount: number;
}

interface AgeAnalysis {
  avgAgeMonth: number;
  ageGroupOneCount: number;
  ageGroupTwoCount: number;
  ageGroupThreeCount: number;
  ageGroupFourCount: number;
}

interface SnackAnalysis {
  avgSnackCountInLargeDog: number;
  avgSnackCountInMiddleDog: number;
  avgSnackCountInSmallDog: number;
  mySnackCount: number;
}

interface WalkingAnalysis {
  highRankPercent: number;
  walkingCountPerWeek: number;
  totalWalingTime: number;
  avgWalkingTimeInCity: number;
  avgWalkingTimeInAge: number;
}

interface WeightAnalysis {
  avgWeight: number;
  weightGroupOneCount: number;
  weightGroupTwoCount: number;
  weightGroupThreeCount: number;
  weightGroupFourCount: number;
}

interface FoodAnalysis {
  oneDayRecommendKcal: number;
  oneDayRecommendGram: number;
  oneMealRecommendGram: number;
}

interface DogActivity {
  activityLevel: string;
  walkingCountPerWeek: number;
  walkingTimePerOneTime: number;
}

interface ResultData {
  lastSurveyDate: string;
  myDogName: string;
  dogSize: string;
  dogActivity: DogActivity;
  ageAnalysis: AgeAnalysis;
  activityAnalysis: ActivityAnalysis;
  avgCautionCountAmongSameSizeDog: number;
  avgScoreAmongAllDogs: number;
  avgScoreAmongSameSizeDog: number;
  avgSupplementCountAmongSameSizeDog: number;
  avgWaterScore: number;
  caution: string;
  cautionCount: number;
  cautionEtc: string;
  cookedDietCountAmongSameSizeDog: number;
  currentMeal: string;
  dogBirthday: string;
  dogCountByDogSize: number;
  dogId: number;
  dogStatus: string;
  dogType: string;
  dogWeight: number;
  dryDietCountAmongSameSizeDog: number;
  foodAnalysis: FoodAnalysis;
  freezeDriedDietCountAmongSameSizeDog: number;
  healthyCount: number;
  homemadeDietCountAmongSameSizeDog: number;
  inedibleFood: string;
  inedibleFoodEtc: string;
  lactatingCount: number;
  needDietCount: number;
  neutralization: boolean;
  newToRawDiet: boolean;
  obesityCount: number;
  pregnantCount: number;
  priorityConcerns: string;
  rawDietCountAmongSameSizeDog: number;
  score: number;
  scoreRankPercentAmongAllDogs: number;
  scoreRankPercentAmongSameSizeDog: number;
  snackAnalysis: SnackAnalysis;
  specificDogStatus: string;
  specificDogStatusEtc: string;
  supplement: string;
  supplementCount: number;
  supplementEtc: string;
  thinCount: number;
  topDogStatusAmongSameSizeDog: string;
  topWaterCountLevelAmongSameSizeDog: string;
  totalDogCount: number;
  walkingAnalysis: WalkingAnalysis;
  waterCountLevel: string;
  weightAnalysis: WeightAnalysis;
}
interface SubscribePlan {
  id: string;
  label: string;
  numberOfPacksPerDay: number;
  weeklyPaymentCycle: number;
  totalNumberOfPacks: number;
  maxRecipeCount: number;
}

interface SurveySection {
  key?: string;
  label?: string;
  steps: number;
}

interface SubtitlePart {
  text: string;
  color?: keyof typeof fontColors;
}

interface SurveyTitleConfig {
  titleTemplates: string[];
  subtitleTemplates?: SubtitlePart[][];
}

/** 성별 */
type Gender = "MALE" | "FEMALE";

/** 견사이즈 */
type DogSize = "SMALL" | "MIDDLE" | "LARGE";

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

type HealthConcernType =
  | "NONE"
  | "DIGESTIVE_CARE"
  | "WEIGHT_MANAGEMENT"
  | "VITALITY_BOOST"
  | "TEAR_STAIN"
  | "SKIN_COAT"
  | "JOINT_CARE"
  | "PUPPY_GROWTH"
  | "AGING_CARE";

type CurrentMealType =
  | "DRY"
  | "WET"
  | "HOMEMADE"
  | "FREEZE_DRIED"
  | "COOKED"
  | "RAW";

/** 보조제 유형 */
type SupplementType =
  | "NONE"
  | "PROBIOTICS"
  | "OMEGA_3"
  | "ANTIOXIDANT"
  | "EYE"
  | "JOINT"
  | "SKIN"
  | "IMMUNE"
  | "HEART"
  | "TEETH"
  | "RESPIRATORY"
  | "VITAMIN"
  | "INTESTINE"
  | "OTHER";

/** 현재 겪고 있는 건강 이슈 유형 */
type HealthIssuesType =
  | "NONE"
  | "HYPERLIPIDEMIA"
  | "PANCREATITIS"
  | "HEART_DISEASE"
  | "RENAL_DISEASE"
  | "DERMATITIS"
  | "DIABETES"
  | "PATELLAR_LUXATION"
  | "LIVER_DISEASE"
  | "OTITIS"
  | "OCULAR_DISEASES";

export type {
  SubscribePlan,
  FoodAnalysis,
  ResultData,
  RecipeData,
  SurveySection,
  SurveyTitleConfig,
  SubtitlePart,
  HealthConcernType,
  HealthIssuesType,
  CurrentMealType,
  SupplementType,
  SnackCountLevel,
  GeneralLevel,
  Gender,
  DogSize,
  BodyFit,
  PregnancyStatus,
  LactationStatus,
};
