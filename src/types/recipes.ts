import {
  DRY_MATTER_MAP,
  INGREDIENTS_MAP,
  NUTRIENT_MAP,
} from "@/constants/recipes";

type IngredientType = keyof typeof INGREDIENTS_MAP;

type NutrientType = keyof typeof NUTRIENT_MAP;

type NutrientValues = Record<NutrientType, number>;

type DryMatterType = keyof typeof DRY_MATTER_MAP;

type DryMatterValues = Record<DryMatterType, number>;

interface RecipeDto {
  id: number;
  name: string;
  description: string;
  pricePerGram: number;
  gramPerKcal: number;
  imgUrl: string;
  inStock: boolean;
  ingredients?: string;
  leaked?: string;
  modifiedDate?: string;
}

interface RecipeItem {
  id: number;
  name: string;
  displayImageUrl: {
    url: string;
  };
  description: string;
  pricePerGram: number;
  gramPerKcal: number;
  ingredients: IngredientType[];
  subIngredients: IngredientType[];
  leaked: string;
  inStock: boolean;
  modifiedDate: string;
}

type RecipeDetailSource = "subscribe" | "recipe";

export type {
  IngredientType,
  NutrientType,
  NutrientValues,
  DryMatterType,
  DryMatterValues,
  RecipeDto,
  RecipeItem,
  RecipeDetailSource,
};
