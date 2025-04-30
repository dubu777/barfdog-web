import { SubscriptionPriceBreakdown } from "@/utils/subscription/calculateSubscriptionPrice";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";
import { useCallback, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";


export const useRecipeEntryManager = (
  recipeId: number,
  recommended: SubscriptionPriceBreakdown
) => {
  const { control } = useFormContext<SubscriptionValues>();
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "recipeList",
  });
  const recipeList = useWatch({ control, name: "recipeList" });
  const existingEntry = recipeList.find((f) => f.recipeId === recipeId);

  const [pendingEntry, setPendingEntry] = useState<{
    packGrams: number;
    orderPrice: number;
  } | null>(null);


  const commitEntry = useCallback(() => {
    const packGrams =
      pendingEntry?.packGrams ?? existingEntry?.packGrams ?? recommended.packGrams;
    const orderPrice =
      pendingEntry?.orderPrice ?? existingEntry?.orderPrice ?? recommended.packPrice;
    const entry = { recipeId, packGrams, orderPrice };
    const index = fields.findIndex((f) => f.recipeId === recipeId);
    if (index > -1) update(index, entry);
    else append(entry);
  }, [pendingEntry, existingEntry, fields, append, update, recommended, recipeId]);


  const applyLocal = useCallback(
    (packGrams: number, orderPrice: number) => {
      setPendingEntry({ packGrams, orderPrice });
    },
    []
  );

  const removeEntry = useCallback(() => {
    if (!existingEntry) return;
    const index = fields.findIndex((f) => f.recipeId === recipeId);
    if (index > -1) remove(index);
    setPendingEntry(null);
  }, [existingEntry, fields, remove, recipeId]);

  return { applyLocal, commitEntry, removeEntry };
}