import { SubscriptionValues } from "@/types";
import { CalculateRecipePackReturn } from "@/utils/subscription/calculateRecipe";
import { useCallback, useMemo, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

export type CommitSelectionResult =
  | { success: true }
  | { success: false; reason: "LIMIT" | "NO_CHANGE" };

export type StagedSelection = { gramsPerMeal: number; pricePerMeal: number };

interface UseRecipeSelectionReturn {
  /** RHF에는 반영하지 않고 로컬 상태만 업데이트 */
  stageSelection: (gramsPerMeal: number, pricePerMeal: number) => void;
  /** 최종 확정값을 RHF 폼에 저장 */
  commitSelection: () => CommitSelectionResult;
  /** RHF와 로컬(스테이징)에서 모두 제거 */
  removeSelection: () => void;
  /** 해당 recipeId가 선택되어 있는지 여부 */
  isSelected: boolean;
  /** RHF의 recipeList 원본 값 */
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
    name: "recipeList",
  });

  const recipeList = useWatch({ control, name: "recipeList" });
  const selectedIds = useMemo(
    () => recipeList?.map((f) => f.recipeId) ?? [],
    [recipeList]
  );

  const savedSelection = useMemo(
    () => recipeList?.find((f) => f.recipeId === recipeId),
    [recipeList, recipeId]
  );

  const [stagedSelection, setStagedSelection] =
    useState<StagedSelection | null>(null);

  const resolve = useCallback(
    (key: "gramsPerMeal" | "pricePerMeal") =>
      stagedSelection?.[key] ?? savedSelection?.[key] ?? recommended[key],
    [stagedSelection, savedSelection, recommended]
  );

  const canAddSelection = useMemo(
    () =>
      savedSelection != null ? true : selectedIds.length < MAX_SELECTABLE_ITEMS,
    [savedSelection, selectedIds.length, MAX_SELECTABLE_ITEMS]
  );

  const commitSelection = useCallback((): CommitSelectionResult => {
    const gramsPerMeal = resolve("gramsPerMeal");
    const pricePerMeal = resolve("pricePerMeal");

    // 이전 값과 동일 하면 거절
    if (
      savedSelection &&
      savedSelection.gramsPerMeal === gramsPerMeal &&
      savedSelection.pricePerMeal === pricePerMeal
    ) {
      return { success: false, reason: "NO_CHANGE" };
    }

    // 신규 추가인데 제한 초과면 거절
    const current = getValues("recipeList") ?? [];
    const exists = current.some((f) => f.recipeId === recipeId);
    if (!exists && current.length >= MAX_SELECTABLE_ITEMS) {
      return { success: false, reason: "LIMIT" };
    }

    const selection = { recipeId, gramsPerMeal, pricePerMeal };

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

  const stageSelection = useCallback(
    (gramsPerMeal: number, pricePerMeal: number) => {
      setStagedSelection({ gramsPerMeal, pricePerMeal });
    },
    []
  );

  const removeSelection = useCallback(() => {
    const current = getValues("recipeList") ?? [];
    const idx = current.findIndex((f) => f.recipeId === recipeId);
    if (idx > -1) remove(idx);
    setStagedSelection(null);
  }, [getValues, remove, recipeId]);

  const isSelected = useMemo(
    () => selectedIds.includes(recipeId),
    [selectedIds, recipeId]
  );

  return {
    stageSelection,
    commitSelection,
    removeSelection,
    isSelected,
    canAddSelection,
    stagedSelection,
  };
};
