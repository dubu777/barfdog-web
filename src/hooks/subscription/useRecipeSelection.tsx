import { CalculateRecipePackReturn } from "@/utils/subscription/calculateRecipe";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";
import { useCallback, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

export type CommitSelectionResult =
  | { success: true }
  | { success: false; reason: "LIMIT" | "NO_CHANGE" };

export type StagedSelection = { packGrams: number; packPrice: number };

interface UseRecipeSelectionReturn {
  /** RHF에는 반영하지 않고 로컬 상태만 업데이트 */
  stageSelection: (packGrams: number, packPrice: number) => void;
  /** 최종 확정값을 RHF 폼에 저장 */
  commitSelection: () => CommitSelectionResult;
  /** RHF와 로컬(스테이징)에서 모두 제거 */
  removeSelection: () => void;
  /** 해당 recipeId가 선택되어 있는지 여부 */
  isSelected: boolean;
  /** 현재 선택된 recipeId 목록 */
  selectedIds: number[];
  /** RHF의 rawFoods 원본 값 */
  canAddSelection: boolean;
  stagedSelection: StagedSelection | null;
}

export const useRecipeSelection = (
  recipeId: number,
  recommended: CalculateRecipePackReturn
): UseRecipeSelectionReturn => {
  const MAX_SELECTABLE_ITEMS = 2;
  const { control, getValues } = useFormContext<SubscriptionValues>();
  const { append, update, remove } = useFieldArray({
    control,
    name: "rawFoods",
  });
  const rawFoods = useWatch({ control, name: "rawFoods" });

  const selectedIds = rawFoods?.map((f) => f.recipeId) ?? [];

  const savedSelection = rawFoods.find((f) => f.recipeId === recipeId);

  const [stagedSelection, setStagedSelection] =
    useState<StagedSelection | null>(null);

  const resolve = useCallback(
    (key: "packGrams" | "packPrice") =>
      stagedSelection?.[key] ?? savedSelection?.[key] ?? recommended[key],
    [stagedSelection, savedSelection, recommended]
  );

  const canAddSelection =
    savedSelection != null ? true : selectedIds.length < MAX_SELECTABLE_ITEMS;

  const commitSelection = useCallback((): CommitSelectionResult => {
    const packGrams = resolve("packGrams");
    const packPrice = resolve("packPrice");

    // 이전 값과 동일 하면 거절
    if (
      savedSelection &&
      savedSelection.packGrams === packGrams &&
      savedSelection.packPrice === packPrice
    ) {
      return { success: false, reason: "NO_CHANGE" };
    }

    // 신규 추가인데 제한 초과면 거절
    const current = getValues("rawFoods") ?? [];
    const exists = current.some((f) => f.recipeId === recipeId);
    if (!exists && current.length >= MAX_SELECTABLE_ITEMS) {
      return { success: false, reason: "LIMIT" };
    }

    const selection = { recipeId, packGrams, packPrice };

    // 인덱스가 -1이면 기존에 배열에 없는 것 즉 신규 추가
    const idx = current.findIndex((f) => f.recipeId === recipeId);
    if (idx > -1) update(idx, selection);
    else append(selection);

    setStagedSelection(null);
    return { success: true };
  }, [
    append,
    update,
    getValues,
    recipeId,
    resolve,
    savedSelection,
    MAX_SELECTABLE_ITEMS,
  ]);

  const stageSelection = useCallback((packGrams: number, packPrice: number) => {
    setStagedSelection({ packGrams, packPrice });
  }, []);

  const removeSelection = useCallback(() => {
    const current = getValues("rawFoods") ?? [];
    const idx = current.findIndex((f) => f.recipeId === recipeId);
    if (idx > -1) remove(idx);
    setStagedSelection(null);
  }, [getValues, remove, recipeId]);

  const isSelected = selectedIds.includes(recipeId);

  return {
    stageSelection,
    commitSelection,
    removeSelection,
    isSelected,
    selectedIds,
    canAddSelection,
    stagedSelection,
  };
};
