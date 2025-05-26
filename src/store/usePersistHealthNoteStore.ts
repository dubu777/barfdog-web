import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DogInfo } from "@/types/healthNote";

interface HealthNoteStore {
  dogInfo: DogInfo | null;
  setDogInfo: (dogInfo: DogInfo) => void;
  reset: () => void;
}

export const usePersistHealthNoteStore = create(
  persist<HealthNoteStore>(
    (set, get) => ({
      dogInfo: null,
      setDogInfo: (dogInfo) => set({ dogInfo }),
      reset: () => {
        set({ dogInfo: null });
      }
    }),
    {
      name: 'healthNote',
    }
  )
);