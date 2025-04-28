import { create } from "zustand";

/** 실제로 저장·공유할 값만 정의 */
export interface PriceSummary {
  packGrams: number;
  packPrice: number;
  pricePer10g: number;
}

interface SubscriptionStore {
  priceSummary: Record<number, PriceSummary>;
  setPriceSummary: (recipeId: number, summary: PriceSummary) => void;
}

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
  priceSummary: {},
  setPriceSummary: (recipeId, summary) =>
    set((state) => ({
      priceSummary: { ...state.priceSummary, [recipeId]: summary },
    })),
}));
