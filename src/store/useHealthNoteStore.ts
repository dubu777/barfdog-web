import { create } from "zustand";
import { PetInfo } from "@/types/healthNote";

interface HealthNoteStore {
  petInfo: PetInfo | null;
  setPetInfo: (petInfo: PetInfo) => void;
}

export const useHealthNoteStore = create<HealthNoteStore>((set) => ({
  petInfo: null,
  setPetInfo: (petInfo) => set({ petInfo }),
}));
