import { ReviewFormData } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ReviewStore {
  reviewFormData: ReviewFormData;
  setReviewFormData: (data: ReviewFormData) => void;
}

export const usePersistReviewStore = create(
  persist<ReviewStore>(
    (set) => ({
      reviewFormData: {
        id: 0,
        title: '',
        reviewType: null,
        orderId: null,
      },
      setReviewFormData: (reviewFormData) => set({ reviewFormData })
    }),
    {
      name: 'review',
    }
  )
);