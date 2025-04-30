import { useCallback } from "react";
import {
  useFormContext,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";

export function useRecipeSelection(
) {
  const { control } = useFormContext<SubscriptionValues>();
  const recipeList = useWatch({ control, name: "recipeList" });
  const selectedIds = recipeList.map((f) => f.recipeId);

  const isSelected = useCallback(
    (recipeId: number) => selectedIds.includes(recipeId),
    [selectedIds]
  );
  return { selectedIds, isSelected };
}