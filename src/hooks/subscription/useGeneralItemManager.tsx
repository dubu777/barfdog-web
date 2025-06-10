import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";
import { useCallback, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

export const useGeneralItemManager = (
  itemId: number,
  defaultAmount: number,
  defaultPrice: number
) => {
  const { control } = useFormContext<SubscriptionValues>();
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "generalItemList",
  });
  const watchedList = useWatch({ control, name: "generalItemList" });
  const generalItemList = watchedList ?? [];
  const existing = generalItemList.find((f) => f.itemId === itemId);

  const [pending, setPending] = useState<{ amount: number; originPrice: number } | null>(null);

  const applyLocal = useCallback((amount: number, originPrice: number) => {
    setPending({ amount, originPrice });
  }, []);

  const commitEntry = useCallback(() => {
    const newAmount = pending?.amount ?? existing?.amount ?? defaultAmount;
    const newOrderPrice = pending?.originPrice ?? existing?.originPrice ?? defaultPrice;
    const index = fields.findIndex((f) => f.itemId === itemId);

    // 수정된 값이 없으면 아무 동작도 하지 않음
    if (
      existing &&
      newAmount === existing.amount &&
      newOrderPrice === existing.originPrice
    ) {
      setPending(null);
      return;
    }

    const entry = { itemId, amount: newAmount, originPrice: newOrderPrice };

    if (existing) {
      // 기존 항목 업데이트
      if (index > -1) update(index, entry);
    } else {
      // 새로운 항목 추가: pending이 없으면 기본값만 추가하지 않음
      if (pending) append(entry);
    }

    setPending(null);
  }, [pending, existing, fields, append, update, itemId, defaultAmount, defaultPrice]);

  const removeEntry = useCallback(() => {
    if (!existing) return;
    const index = fields.findIndex((f) => f.itemId === itemId);
    if (index > -1) remove(index);
    setPending(null);
  }, [existing, fields, remove, itemId]);

  return { applyLocal, commitEntry, removeEntry, existing, pending };
};
