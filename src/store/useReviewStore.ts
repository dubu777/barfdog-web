import {ReviewFormData} from "@/types";
import {create} from "zustand";

interface ReviewStore {
  reviewFormData: ReviewFormData;
  setReviewFormData: (data: ReviewFormData) => void;
}

export const useReviewStore = create<ReviewStore>((set) => ({
  reviewFormData: {
    id: 0,
    title: '',
    reviewType: null,
  },
  setReviewFormData: (reviewFormData) => set({ reviewFormData })
}))