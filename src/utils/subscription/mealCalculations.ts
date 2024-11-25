import { DECIMAL_PRECISION, kcalPerGramMap } from "@/constants";
import { calculateOneMealGramsInput, calculateOneMealGramsOutput, calculateOneMealGramsWithVolumeInput, RecipeDto } from "@/types";

// 한 끼 무게를 계산하는 함수
export const calculateOneMealGrams = ({
  selectedRecipeIds,
  recipeDtoList,
  oneDayRecommendKcal,
  isOriginSubscriber = false,
}: calculateOneMealGramsInput): calculateOneMealGramsOutput[] => {
  // 데이터 유효성 검사
  if (
    !Array.isArray(selectedRecipeIds) ||
    selectedRecipeIds.length === 0 ||
    recipeDtoList.length === 0
  ) {
    return [];
  }

  // 레시피 정보를 맵으로 변환 (성능 최적화)
  const recipeMap = recipeDtoList.reduce<Record<number, RecipeDto>>(
    (acc, recipe) => {
      acc[recipe.id] = recipe;
      return acc;
    },
    {}
  );

  // 한 끼 무게 계산
  return selectedRecipeIds
    .map((recipeId) => {
      const recipe = recipeMap[recipeId];
      if (!recipe) return null; // 잘못된 ID일 경우 null 반환

      const numberOfMealsPerDay = 2; // 하루 식사 횟수
      const kcalPerGram =
        isOriginSubscriber && kcalPerGramMap[recipe.name]
          ? kcalPerGramMap[recipe.name]
          : recipe.gramPerKcal;

      // 한 끼 무게 계산
      const oneMealGram = parseFloat(
        (oneDayRecommendKcal / kcalPerGram / numberOfMealsPerDay).toFixed(
          DECIMAL_PRECISION.ONE_MEAL_GRAM_PRECISION
        )
      );

      return {
        recipeId: recipe.id,
        recipeName: recipe.name,
        oneMealGram,
        pricePerGram: recipe.pricePerGram,
      };
    })
    .filter((meal): meal is NonNullable<typeof meal> => meal !== null);
};


// 토핑 플랜 선택시 용량에 따른 한끼 무게 계산
export const calculateOneMealGramsWithVolume = ({
  selectedRecipeIds,
  recipeDtoList,
  oneDayRecommendKcal,
  isOriginSubscriber = false,
  selectedVolume,
}: calculateOneMealGramsWithVolumeInput): calculateOneMealGramsOutput[] => {
  // 기본 한 끼 무게 계산
  const baseMealGrams = calculateOneMealGrams({
    selectedRecipeIds,
    recipeDtoList,
    oneDayRecommendKcal,
    isOriginSubscriber,
  });

  // 토핑 용량이 선택되지 않은 경우 기본값 반환
  if (!selectedVolume) {
    return baseMealGrams;
  }

  // 토핑 용량 적용하여 계산
  const volumeMultiplier = parseFloat(selectedVolume);
  if (isNaN(volumeMultiplier) || volumeMultiplier <= 0) {
    console.warn("Invalid topping volume selected:", selectedVolume);
    return baseMealGrams;
  }

  return baseMealGrams.map((meal) => ({
    ...meal,
    oneMealGram: parseFloat(
      (meal.oneMealGram * volumeMultiplier).toFixed(DECIMAL_PRECISION.ONE_MEAL_GRAM_PRECISION)
    ),
  }));
};


// 하루 권장 칼로리를 소수점 제한하여 반환하는 함수
export const calculateDailyRecommendedKcal = (kcal: number) => {
  return parseFloat(kcal.toFixed(DECIMAL_PRECISION.ONE_DAY_KCAL_PRECISION));
};
