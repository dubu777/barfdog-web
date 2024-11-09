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

interface RecipeDto {
  id: number;
  name: string;
  description: string;
  pricePerGram: number;
  gramPerKcal: number;
  imgUrl: string;
  inStock: boolean;
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

interface SurveyResult {
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
export type { SurveyFormData, SurveyResult, RecipeDto, FoodAnalysis };
