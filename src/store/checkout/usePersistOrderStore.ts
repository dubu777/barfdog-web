import { GeneralItemRequest } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PersistOrderStore {
  itemList: GeneralItemRequest[];
  setItemList: (items: GeneralItemRequest[]) => void;
  clearItemList: () => void;
}

export const usePersistOrderStore = create(
  persist<PersistOrderStore>(
    (set) => ({
      itemList: [],
      setItemList: (items) => set({ itemList: items }),
      clearItemList: () => set({ itemList: [] }),
    }),
    {
      name: "general-order",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
