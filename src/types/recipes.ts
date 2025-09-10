import { DRY_MATTER_MAP, INGREDIENTS_MAP, NUTRIENT_MAP } from "@/constants/recipes";

type IngredientType = keyof typeof INGREDIENTS_MAP;

type NutrientType = keyof typeof NUTRIENT_MAP;

type NutrientValues = Record<NutrientType, number>;

type DryMatterType = keyof typeof DRY_MATTER_MAP;

type DryMatterValues = Record<DryMatterType, number>;

export type {
  IngredientType,
  NutrientType,
  NutrientValues,
  DryMatterType,
  DryMatterValues,
};