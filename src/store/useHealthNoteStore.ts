import { create } from "zustand";
import { DogInfo } from "@/types/healthNote";

interface HealthNoteStore {
  dogInfo: DogInfo | null;
  setDogInfo: (dogInfo: DogInfo) => void;
}

export const useHealthNoteStore = create<HealthNoteStore>((set) => ({
  dogInfo: null,
  setDogInfo: (dogInfo) => set({ dogInfo }),
}));
