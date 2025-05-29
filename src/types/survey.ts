import { fontColors } from "@/components/common/defaultText/DefaultText.css";
import { RecipeDto } from "@/types/recipe";

export type {
  SubscribePlan,
  SurveyFormData,
  FoodAnalysis,
  ResultData,
  RecipeData,
  SurveySection,
  SurveyTitleConfig,
  SubtitlePart,
};

interface SurveyFormData {
  name: string;
  gender: string;
  birth: string;
  oldDog: boolean;
  dogSize: string;
  dogType: string;
  weight: string;
  neutralization: boolean | null;
  activityLevel: string;
  walkingCountPerWeek: string;
  walkingTimePerOneTime: string;
  dogStatus: string;
  specificDogStatus: string;
  specificDogStatusEtc: string;
  snackCountLevel: string;
  waterCountLevel: string;
  supplement: string;
  supplementEtc: string;
  currentMeal: string;
  inedibleFood: string;
  inedibleFoodEtc: string;
  recommendRecipeId: number | null;
  caution: string;
  cautionEtc: string;
  expectedPregnancyDay: string;
  newToRawDiet: boolean | null;
  priorityConcerns: string;
}

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
