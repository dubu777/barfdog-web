import { CalculateRecipePackOutput } from "@/utils/subscription/calculateRecipe";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";
import { useCallback, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

export const useRecipeEntryManager = (
  recipeId: number,
  recommended: CalculateRecipePackOutput
) => {
  const { control } = useFormContext<SubscriptionValues>();
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "rawFoods",
  });
  const rawFoods = useWatch({ control, name: "rawFoods" });
  const existingEntry = rawFoods.find((f) => f.recipeId === recipeId);

  const [pendingEntry, setPendingEntry] = useState<{
    packGrams: number;
    packPrice: number;
  } | null>(null);

  const commitEntry = useCallback(() => {
    const oneMealGramsPerRecipe =
      pendingEntry?.packGrams ??
      existingEntry?.oneMealGramsPerRecipe ??
      recommended.packGrams;
    const packPrice =
      pendingEntry?.packPrice ??
      existingEntry?.packPrice ??
      recommended.packPrice;
    const entry = {
      recipeId,
      oneMealGramsPerRecipe,
      packPrice,
      originalPrice: recommended.packPrice,
      discountedPrice: packPrice,
    };
    const index = fields.findIndex((f) => f.recipeId === recipeId);
    if (index > -1) update(index, entry);
    else append(entry);
  }, [
    pendingEntry,
    existingEntry,
    fields,
    append,
    update,
    recommended,
    recipeId,
  ]);

  const applyLocal = useCallback((packGrams: number, packPrice: number) => {
    setPendingEntry({ packGrams, packPrice });
  }, []);

  const removeEntry = useCallback(() => {
    if (!existingEntry) return;
    const index = fields.findIndex((f) => f.recipeId === recipeId);
    if (index > -1) remove(index);
    setPendingEntry(null);
  }, [existingEntry, fields, remove, recipeId]);

  return { applyLocal, commitEntry, removeEntry };
};
