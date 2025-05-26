import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DogInfo } from "@/types/healthNote";

interface HealthNoteStore {
  dogInfo: DogInfo | null;
  setDogInfo: (dogInfo: DogInfo) => void;
}

export const usePersistHealthNoteStore = create(
  persist<HealthNoteStore>(
    (set) => ({
      dogInfo: null,
      setDogInfo: (dogInfo) => set({ dogInfo })
    }),
    {
      name: 'healthNote',
    }
  )
);